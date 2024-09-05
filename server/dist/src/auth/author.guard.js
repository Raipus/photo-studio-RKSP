"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorGuard = void 0;
const common_1 = require("@nestjs/common");
class AuthorGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const path = request.url.split('/');
        let entity;
        switch (path) {
            case path.includes('bookings'):
                console.log('Book');
                break;
            default:
                throw new common_1.NotFoundException('AVAVA!');
        }
        if (path.includes('photographers')) {
            console.log('Photographers');
        }
        if (path.includes('photos')) {
            console.log('Photos');
        }
        if (path.includes('studios')) {
            console.log('Studios');
        }
        if (path.includes('users')) {
            console.log('Users');
        }
        return true;
    }
}
exports.AuthorGuard = AuthorGuard;
//# sourceMappingURL=author.guard.js.map