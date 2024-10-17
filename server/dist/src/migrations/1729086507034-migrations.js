"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1729086507034 = void 0;
class Migrations1729086507034 {
    constructor() {
        this.name = 'Migrations1729086507034';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "photographers" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "password" character varying NOT NULL, "role" character varying, "refreshToken" character varying, "work_exp" integer NOT NULL, "cost" integer NOT NULL, CONSTRAINT "PK_9ecef0afe25ec4afcb5216e7f45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "studios" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "description" character varying NOT NULL, "cost" integer NOT NULL, CONSTRAINT "PK_76ff398ef5041c4b42618ed6111" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "people_number" integer NOT NULL, "userId" integer, "studioId" integer, "photographerId" integer, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "fullname" character varying, "email" character varying NOT NULL, "phone" character varying, "password" character varying NOT NULL, "role" character varying, "refreshToken" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_2db15edb1ccb8891a9367a9e251" FOREIGN KEY ("studioId") REFERENCES "studios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_d12e5e188c93539e60cc82f7064" FOREIGN KEY ("photographerId") REFERENCES "photographers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_d12e5e188c93539e60cc82f7064"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_2db15edb1ccb8891a9367a9e251"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_38a69a58a323647f2e75eb994de"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "studios"`);
        await queryRunner.query(`DROP TABLE "photographers"`);
    }
}
exports.Migrations1729086507034 = Migrations1729086507034;
//# sourceMappingURL=1729086507034-migrations.js.map