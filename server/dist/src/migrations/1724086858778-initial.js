"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1724086858778 = void 0;
class Initial1724086858778 {
    constructor() {
        this.name = 'Initial1724086858778';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "fullname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ALTER COLUMN "role" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "photographers" ALTER COLUMN "role" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "fullname" SET NOT NULL`);
    }
}
exports.Initial1724086858778 = Initial1724086858778;
//# sourceMappingURL=1724086858778-initial.js.map