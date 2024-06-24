import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1714997122105 implements MigrationInterface {
    name = 'Initial1714997122105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_photographer" DROP CONSTRAINT "FK_9f1d8ad577e23bced97525ffb85"`);
        await queryRunner.query(`ALTER TABLE "client_photographer" DROP CONSTRAINT "FK_bc9d34a3957e60587b28170930f"`);
        await queryRunner.query(`ALTER TABLE "client_studio" DROP CONSTRAINT "FK_683b98038a29092f06bfa47b97d"`);
        await queryRunner.query(`ALTER TABLE "client_studio" DROP CONSTRAINT "FK_3f112132713a3c770e51a0fdb9f"`);
        await queryRunner.query(`ALTER TABLE "studios" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "studios" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_photographer" ADD CONSTRAINT "FK_bc9d34a3957e60587b28170930f" FOREIGN KEY ("photographer_id") REFERENCES "photographers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_photographer" ADD CONSTRAINT "FK_9f1d8ad577e23bced97525ffb85" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_studio" ADD CONSTRAINT "FK_3f112132713a3c770e51a0fdb9f" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_studio" ADD CONSTRAINT "FK_683b98038a29092f06bfa47b97d" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_studio" DROP CONSTRAINT "FK_683b98038a29092f06bfa47b97d"`);
        await queryRunner.query(`ALTER TABLE "client_studio" DROP CONSTRAINT "FK_3f112132713a3c770e51a0fdb9f"`);
        await queryRunner.query(`ALTER TABLE "client_photographer" DROP CONSTRAINT "FK_9f1d8ad577e23bced97525ffb85"`);
        await queryRunner.query(`ALTER TABLE "client_photographer" DROP CONSTRAINT "FK_bc9d34a3957e60587b28170930f"`);
        await queryRunner.query(`ALTER TABLE "studios" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "studios" ADD "description" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_studio" ADD CONSTRAINT "FK_3f112132713a3c770e51a0fdb9f" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_studio" ADD CONSTRAINT "FK_683b98038a29092f06bfa47b97d" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_photographer" ADD CONSTRAINT "FK_bc9d34a3957e60587b28170930f" FOREIGN KEY ("photographer_id") REFERENCES "photographers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_photographer" ADD CONSTRAINT "FK_9f1d8ad577e23bced97525ffb85" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
