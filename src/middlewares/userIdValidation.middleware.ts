import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getDataFromToken } from 'src/auth/helpers/jwt';
import { UserRolesEnum } from 'src/common/enums/UserRolesEnum';

@Injectable()
export class UserIdValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const paramsId = req.params.id;
    const token = req.headers.authorization?.split(' ')[1];

    if (!paramsId || !token) {
      return res.status(400).json({
        message: 'id or token is missing',
      });
    }

    try {
      const tokenId = await getDataFromToken(token);
      const role = await getDataFromToken(token, 'role');

      if (Number(tokenId) === Number(paramsId)) {
        next();
      } else if (role === UserRolesEnum.Admin) {
        next();
      } else {
        return res.status(401).json({
          message: "provided user id's are different",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong:(',
      });
    }
  }
}
