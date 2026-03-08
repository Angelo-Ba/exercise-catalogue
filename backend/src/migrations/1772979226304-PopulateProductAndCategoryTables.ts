import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateProductAndCategoryTables1772979226304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Inserimento Categorie (Usiamo OVERRIDING SYSTEM VALUE per forzare gli ID se necessario)
    await queryRunner.query(`
            INSERT INTO public.category (id, name) VALUES 
            (1, 'Food'),
            (2, 'Electronics'),
            (3, 'Home & Garden'),
            (4, 'Books'),
            (5, 'Fashion'),
            (6, 'Sports & Outdoors'),
            (7, 'Toys & Games'),
            (8, 'Health & Beauty'),
            (9, 'Automotive'),
            (10, 'Groceries'),
            (11, 'Pet Supplies')
            ON CONFLICT (id) DO NOTHING;
        `);

    // Sincronizziamo la sequenza degli ID dopo l'insert manuale
    await queryRunner.query(
      `SELECT setval(pg_get_serial_sequence('category', 'id'), coalesce(max(id), 1)) FROM public.category;`,
    );

    // 2. Inserimento 100 Prodotti randomici
    await queryRunner.query(`
            INSERT INTO public.product (name, price, category_id, tags, created_at)
            SELECT 
                'Product ' || i AS name,
                ROUND((RANDOM() * (500 - 10) + 10)::numeric, 2) AS price,
                (FLOOR(RANDOM() * 11) + 1)::int AS category_id,
                CASE 
                    WHEN i % 3 = 0 THEN ARRAY['premium', 'new']
                    WHEN i % 3 = 1 THEN ARRAY['sale', 'limited']
                    ELSE ARRAY['best-seller']
                END AS tags,
                NOW() - (RANDOM() * INTERVAL '30 days') AS created_at
            FROM generate_series(1, 100) AS i;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Svuotiamo le tabelle in ordine inverso per i vincoli di Foreign Key
    await queryRunner.query(`DELETE FROM public.product;`);
    await queryRunner.query(`DELETE FROM public.category;`);

    // Reset dei contatori serial
    await queryRunner.query(`ALTER SEQUENCE product_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE category_id_seq RESTART WITH 1;`);
  }
}
