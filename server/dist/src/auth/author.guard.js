"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorGuard = void 0;
class AuthorGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const path = request.url.split('/');
        if (path.includes('bookings')) {
            console.log('Bookings');
        }
        return true;
    }
}
exports.AuthorGuard = AuthorGuard;
//# sourceMappingURL=author.guard.js.map