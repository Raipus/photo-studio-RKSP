import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initial1724085655185 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}