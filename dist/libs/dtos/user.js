"use strict";
// import {
//   IsString,
//   IsDefined,
//   ValidateNested,
//   IsArray,
//   IsOptional,
//   IsNumber,
//   IsEnum,
// } from "class-validator";
// import { Expose } from "class-transformer";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchManagersRequest = exports.RemoveManager = exports.GetSubordinatesList = exports.GetManagerList = exports.AssignManagersToUsers = exports.AssignManagerToUser = void 0;
// // export class GetUserList {
// //   @IsString()
// //   @IsDefined()
// //   @Expose()
// //   id: string;
// //   @IsString()
// //   @IsDefined()
// //   @Expose()
// //   id: string;
// // }
// export class RegisterUser {
//   @IsString()
//   @IsDefined()
//   @Expose()
//   firstName: string;
//   lastName?: string;
//   emailId: string;
//   phoneNumber?: number;
// }
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("@buyerassist/common");
class AssignManagerToUser {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], AssignManagerToUser.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], AssignManagerToUser.prototype, "managerId", void 0);
exports.AssignManagerToUser = AssignManagerToUser;
class AssignManagersToUsers {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => AssignManagerToUser)
], AssignManagersToUsers.prototype, "input", void 0);
exports.AssignManagersToUsers = AssignManagersToUsers;
class GetManagerList {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], GetManagerList.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)()
], GetManagerList.prototype, "level", void 0);
exports.GetManagerList = GetManagerList;
class GetSubordinatesList {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], GetSubordinatesList.prototype, "managerId", void 0);
exports.GetSubordinatesList = GetSubordinatesList;
class RemoveManager {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], RemoveManager.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)()
], RemoveManager.prototype, "managerId", void 0);
exports.RemoveManager = RemoveManager;
var SearchManagersFields;
(function (SearchManagersFields) {
    SearchManagersFields[SearchManagersFields["manager.userId"] = 0] = "manager.userId";
    SearchManagersFields[SearchManagersFields["manager.managerId"] = 1] = "manager.managerId";
})(SearchManagersFields || (SearchManagersFields = {}));
class SearchManagersFilter extends common_1.Filter {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(SearchManagersFields)
], SearchManagersFilter.prototype, "field", void 0);
class SearchManagersSortExpression extends common_1.SortExpression {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(SearchManagersFields)
], SearchManagersSortExpression.prototype, "field", void 0);
class SearchManagersFiltersExpression extends common_1.FiltersExpression {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SearchManagersFilter),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)()
], SearchManagersFiltersExpression.prototype, "filters", void 0);
class SearchManagersRequest {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SearchManagersFiltersExpression),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)()
], SearchManagersRequest.prototype, "filter", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SearchManagersSortExpression),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)()
], SearchManagersRequest.prototype, "sort", void 0);
exports.SearchManagersRequest = SearchManagersRequest;
