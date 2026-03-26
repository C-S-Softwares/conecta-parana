import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard {
    constructor(
        private readonly jwt: JwtService,
        private readonly config: ConfigService,
    ) {}

    canActivate(context: ExecutionContext) : boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractToken(request);

        if (!token) {
            throw new UnauthorizedException('Token de autenticação não encontrado');
        }

       try {
            const payload = this.jwt.verify(token, {
                secret: this.config.get<string>('JWT_SECRET'),
            });
            request['user'] = payload;  
            return true;
        } catch {
            throw new UnauthorizedException('Token de autenticação inválido ou expirado')
        }
    }
            
    private extractToken(request: Request): string | null {
        const auth = request.headers.authorization;
        if (!auth || !auth.startsWith('Bearer ')) return null;
        return auth.split(' ')[1];
    }
}  