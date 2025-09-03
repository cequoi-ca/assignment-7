/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, KoaTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BooksRoutes } from './../routes';
import type { Context, Next, Middleware, Request as KRequest, Response as KResponse } from 'koa';
import type * as KoaRouter from '@koa/router';


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "BookID": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Book": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"BookID"},
            "name": {"dataType":"string","required":true},
            "author": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "price": {"dataType":"double","required":true},
            "image": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Filter": {
        "dataType": "refObject",
        "properties": {
            "from": {"dataType":"double"},
            "to": {"dataType":"double"},
            "name": {"dataType":"string"},
            "author": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new KoaTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


export function RegisterRoutes(router: KoaRouter) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


        const argsBooksRoutes_listBooks: Record<string, TsoaRoute.ParameterSchema> = {
                filters: {"in":"body","name":"filters","required":true,"dataType":"array","array":{"dataType":"refObject","ref":"Filter"}},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        router.post('/books/list',
            ...(fetchMiddlewares<Middleware>(BooksRoutes)),
            ...(fetchMiddlewares<Middleware>(BooksRoutes.prototype.listBooks)),

            async function BooksRoutes_listBooks(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsBooksRoutes_listBooks, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new BooksRoutes();

            return templateService.apiHandler({
              methodName: 'listBooks',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBooksRoutes_getBooks: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                priceFrom: {"in":"query","name":"priceFrom","dataType":"double"},
                priceTo: {"in":"query","name":"priceTo","dataType":"double"},
        };
        router.get('/books/list',
            ...(fetchMiddlewares<Middleware>(BooksRoutes)),
            ...(fetchMiddlewares<Middleware>(BooksRoutes.prototype.getBooks)),

            async function BooksRoutes_getBooks(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsBooksRoutes_getBooks, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new BooksRoutes();

            return templateService.apiHandler({
              methodName: 'getBooks',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBooksRoutes_createOrUpdateBook: Record<string, TsoaRoute.ParameterSchema> = {
                book: {"in":"body","name":"book","required":true,"ref":"Book"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        router.post('/books',
            ...(fetchMiddlewares<Middleware>(BooksRoutes)),
            ...(fetchMiddlewares<Middleware>(BooksRoutes.prototype.createOrUpdateBook)),

            async function BooksRoutes_createOrUpdateBook(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsBooksRoutes_createOrUpdateBook, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new BooksRoutes();

            return templateService.apiHandler({
              methodName: 'createOrUpdateBook',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBooksRoutes_getBook: Record<string, TsoaRoute.ParameterSchema> = {
                book: {"in":"path","name":"book","required":true,"ref":"BookID"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        router.get('/books/:book',
            ...(fetchMiddlewares<Middleware>(BooksRoutes)),
            ...(fetchMiddlewares<Middleware>(BooksRoutes.prototype.getBook)),

            async function BooksRoutes_getBook(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsBooksRoutes_getBook, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new BooksRoutes();

            return templateService.apiHandler({
              methodName: 'getBook',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
