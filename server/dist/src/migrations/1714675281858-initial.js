"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1714675281858 = void 0;
class Initial1714675281858 {
    constructor() {
        this.name = 'Initial1714675281858';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "studios" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "description" integer NOT NULL, CONSTRAINT "PK_76ff398ef5041c4b42618ed6111" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photographers" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "phone" character varying NOT NULL, "work_exp" integer NOT NULL, CONSTRAINT "PK_9ecef0afe25ec4afcb5216e7f45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_studio" ("studio_id" integer NOT NULL, "client_id" integer NOT NULL, CONSTRAINT "PK_27cc0ac0e4f0ffc2949f47ffb27" PRIMARY KEY ("studio_id", "client_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_683b98038a29092f06bfa47b97" ON "client_studio" ("studio_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f112132713a3c770e51a0fdb9" ON "client_studio" ("client_id") `);
        await queryRunner.query(`CREATE TABLE "client_photographer" ("client_id" integer NOT NULL, "photographer_id" integer NOT NULL, CONSTRAINT "PK_fef69559aa0eb723c272d40201e" PRIMARY KEY ("client_id", "photographer_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9f1d8ad577e23bced97525ffb8" ON "client_photographer" ("client_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc9d34a3957e60587b28170930" ON "client_photographer" ("photographer_id") `);
        await queryRunner.query(`ALTER TABLE "client_studio" ADD CONSTRAINT "FK_683b98038a29092f06bfa47b97d" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_studio" ADD CONSTRAINT "FK_3f112132713a3c770e51a0fdb9f" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_photographer" ADD CONSTRAINT "FK_9f1d8ad577e23bced97525ffb85" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_photographer" ADD CONSTRAINT "FK_bc9d34a3957e60587b28170930f" FOREIGN KEY ("photographer_id") REFERENCES "photographers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "client_photographer" DROP CONSTRAINT "FK_bc9d34a3957e60587b28170930f"`);
        await queryRunner.query(`ALTER TABLE "client_photographer" DROP CONSTRAINT "FK_9f1d8ad577e23bced97525ffb85"`);
        await queryRunner.query(`ALTER TABLE "client_studio" DROP CONSTRAINT "FK_3f112132713a3c770e51a0fdb9f"`);
        await queryRunner.query(`ALTER TABLE "client_studio" DROP CONSTRAINT "FK_683b98038a29092f06bfa47b97d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc9d34a3957e60587b28170930"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f1d8ad577e23bced97525ffb8"`);
        await queryRunner.query(`DROP TABLE "client_photographer"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f112132713a3c770e51a0fdb9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_683b98038a29092f06bfa47b97"`);
        await queryRunner.query(`DROP TABLE "client_studio"`);
        await queryRunner.query(`DROP TABLE "photographers"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "studios"`);
    }
}
exports.Initial1714675281858 = Initial1714675281858;
//# sourceMappingURL=1714675281858-initial.js.map