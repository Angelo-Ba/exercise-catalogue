import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCatalogue1772888726724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Categorie
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS category (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL
            );
        `);

    // Prodotti
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS product (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL,
                price NUMERIC CHECK (price >= 0),
                category_id INT REFERENCES category(id),
                tags TEXT[],
                created_at TIMESTAMPTZ DEFAULT now()
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS product;`);
    await queryRunner.query(`DROP TABLE IF EXISTS category;`);
  }
}
