"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const photographers_service_1 = require("../photographers/photographers.service");
let AuthService = class AuthService {
    constructor(usersService, photographerService, jwtService, configService) {
        this.usersService = usersService;
        this.photographerService = photographerService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signUp(createUserDto) {
        const userExists = await this.usersService.findOne(createUserDto.email);
        if (userExists) {
            throw new common_1.BadRequestException(`Пользователь с почтой ${createUserDto.email} уже существует!`);
        }
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hash,
        });
        const tokens = await this.getTokens(newUser.id, newUser.email, newUser.role);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken, newUser.role);
        return tokens;
    }
    async signIn(data) {
        const user1 = await this.photographerService.findOne(data.email);
        if (user1) {
            const passwordMatches = await argon2.verify(user1.password, data.password);
            if (!passwordMatches)
                throw new common_1.BadRequestException('Пароль неверный!');
            const tokens = await this.getTokens(user1.id, user1.email, user1.role);
            await this.updateRefreshToken(user1.id, tokens.refreshToken, user1.role);
            return tokens;
        }
        else {
            const user = await this.usersService.findOne(data.email);
            if (!user)
                throw new common_1.BadRequestException(`Пользователя с почтой ${data.email} не существует!`);
            const passwordMatches = await argon2.verify(user.password, data.password);
            if (!passwordMatches)
                throw new common_1.BadRequestException('Пароль неверный!');
            const tokens = await this.getTokens(user.id, user.email, user.role);
            await this.updateRefreshToken(user.id, tokens.refreshToken, user.role);
            return tokens;
        }
    }
    async logout(userId, role) {
        if (role == "user" || role == "admin")
            return this.usersService.updateToken(userId, { refreshToken: null });
        else {
            return this.photographerService.updateToken(userId, { refreshToken: null });
        }
    }
    hashData(data) {
        return argon2.hash(data);
    }
    async updateRefreshToken(userId, refreshToken, role) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        if (role == "user" || role == "admin")
            await this.usersService.updateToken(userId, { refreshToken: hashedRefreshToken });
        else {
            await this.photographerService.updateToken(userId, { refreshToken: hashedRefreshToken });
        }
    }
    async getTokens(userId, email, role) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
                role,
            }, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
                role,
            }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshTokens(userEmail, role, refreshToken) {
        const user1 = await this.photographerService.findOne(userEmail);
        if (user1) {
            if (!user1 || !user1.refreshToken)
                throw new common_1.ForbiddenException('Access Denied');
            const refreshTokenMatches = await argon2.verify(user1.refreshToken, refreshToken);
            if (!refreshTokenMatches)
                throw new common_1.ForbiddenException('Access Denied');
            const tokens = await this.getTokens(user1.id, user1.email, user1.role);
            await this.updateRefreshToken(user1.id, tokens.refreshToken, user1.role);
            return tokens;
        }
        else {
            const user = await this.usersService.findOne(userEmail);
            if (!user || !user.refreshToken)
                throw new common_1.ForbiddenException('Access Denied');
            const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
            if (!refreshTokenMatches)
                throw new common_1.ForbiddenException('Access Denied');
            const tokens = await this.getTokens(user.id, user.email, user.role);
            await this.updateRefreshToken(user.id, tokens.refreshToken, user.role);
            return tokens;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UsersService,
        photographers_service_1.PhotographersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map