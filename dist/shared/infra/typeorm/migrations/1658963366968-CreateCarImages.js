"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarImages1658963366968 = void 0;

var _typeorm = require("typeorm");

class CreateCarImages1658963366968 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "cars_image",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "image_name",
        type: "varchar"
      }, {
        name: "car_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: "FKImagesCar",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("cars_image");
  }

}

exports.CreateCarImages1658963366968 = CreateCarImages1658963366968;