"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1726503191941 = void 0;
class Migrations1726503191941 {
    constructor() {
        this.name = 'Migrations1726503191941';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "studios" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "description" character varying NOT NULL, "cost" integer NOT NULL, CONSTRAINT "PK_76ff398ef5041c4b42618ed6111" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "path" character varying NOT NULL, "studioId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photographers" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "password" character varying NOT NULL, "role" character varying, "work_exp" integer NOT NULL, "cost" integer NOT NULL, "photoId" integer, CONSTRAINT "REL_c9d55c8502fb0367688a4fa242" UNIQUE ("photoId"), CONSTRAINT "PK_9ecef0afe25ec4afcb5216e7f45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "people_number" integer NOT NULL, "userId" integer, "studioId" integer, "photographerId" integer, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "fullname" character varying, "email" character varying NOT NULL, "phone" character varying, "password" character varying NOT NULL, "role" character varying, "photoId" integer, CONSTRAINT "REL_f856a4818b32c69dbc8811f3d2" UNIQUE ("photoId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_2e0fac3d793dd97f5ab68c8c119" FOREIGN KEY ("studioId") REFERENCES "studios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photographers" ADD CONSTRAINT "FK_c9d55c8502fb0367688a4fa2428" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_2db15edb1ccb8891a9367a9e251" FOREIGN KEY ("studioId") REFERENCES "studios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_d12e5e188c93539e60cc82f7064" FOREIGN KEY ("photographerId") REFERENCES "photographers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f856a4818b32c69dbc8811f3d2c" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f856a4818b32c69dbc8811f3d2c"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_d12e5e188c93539e60cc82f7064"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_2db15edb1ccb8891a9367a9e251"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_38a69a58a323647f2e75eb994de"`);
        await queryRunner.query(`ALTER TABLE "photographers" DROP CONSTRAINT "FK_c9d55c8502fb0367688a4fa2428"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_2e0fac3d793dd97f5ab68c8c119"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "photographers"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "studios"`);
    }
}
exports.Migrations1726503191941 = Migrations1726503191941;
//# sourceMappingURL=1726503191941-migrations.js.map