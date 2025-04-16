import { ICronograma } from "../../domain/entities/Cronograma";
import { neon, Pool } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL não definida no arquivo .env");
}

const sql = neon(DATABASE_URL);

export interface IBancoDeDados<T> {
  query(sql: string, param?: any): Promise<T[] | null>;
}

export class BancoDeDados implements IBancoDeDados<ICronograma> {

  async query(sqlString: string, param?: any): Promise<ICronograma[]> {
    try {
      if (sqlString === "SELECT * FROM cronograma;") {
        const data = await sql`SELECT * FROM cronograma;`;

        const result: ICronograma[] = data.map((row: any) => ({
          disciplinaId: row.disciplinaid,
          atividades: typeof row.atividades === "string" ? JSON.parse(row.atividades) : row.atividades
        }));

        return result;

      } else if (sqlString === "SELECT * FROM cronograma where id = $id;") {
        if (!param) return [];
        
        const pool = new Pool({ connectionString: DATABASE_URL });
        const res = await pool.query(
          `SELECT * FROM cronograma WHERE id = $1`,
          [param]
        );
        pool.end();

        if (res.rows.length === 0) return [];

        const row = res.rows[0];
        const result: ICronograma = {
          disciplinaId: row.disciplinaid,
          atividades: typeof row.atividades === "string" ? JSON.parse(row.atividades) : row.atividades
        };

        return [result];
      }

      return [];

    } catch (error) {
      console.error("Erro ao executar query no banco:", error);
      return [];
    }
  }
}
