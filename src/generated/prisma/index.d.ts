
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model BookingSlot
 * 
 */
export type BookingSlot = $Result.DefaultSelection<Prisma.$BookingSlotPayload>
/**
 * Model OpenGame
 * 
 */
export type OpenGame = $Result.DefaultSelection<Prisma.$OpenGamePayload>
/**
 * Model OpenGameParticipant
 * 
 */
export type OpenGameParticipant = $Result.DefaultSelection<Prisma.$OpenGameParticipantPayload>
/**
 * Model SlotBlock
 * 
 */
export type SlotBlock = $Result.DefaultSelection<Prisma.$SlotBlockPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BookingType: {
  PRIVATE: 'PRIVATE',
  OPEN: 'OPEN'
};

export type BookingType = (typeof BookingType)[keyof typeof BookingType]


export const BookingStatus: {
  PRIVATE_CONFIRMED: 'PRIVATE_CONFIRMED',
  OPEN_PENDING_FILL: 'OPEN_PENDING_FILL',
  OPEN_CONFIRMED: 'OPEN_CONFIRMED',
  OPEN_EXPIRED: 'OPEN_EXPIRED',
  CANCELLED: 'CANCELLED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const OpenGameStatus: {
  PENDING_FILL: 'PENDING_FILL',
  CONFIRMED: 'CONFIRMED',
  FULL: 'FULL',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED'
};

export type OpenGameStatus = (typeof OpenGameStatus)[keyof typeof OpenGameStatus]


export const SlotBlockReason: {
  MAINTENANCE: 'MAINTENANCE',
  ADMIN_BLOCK: 'ADMIN_BLOCK',
  PRIVATE_EVENT: 'PRIVATE_EVENT',
  OTHER: 'OTHER'
};

export type SlotBlockReason = (typeof SlotBlockReason)[keyof typeof SlotBlockReason]

}

export type BookingType = $Enums.BookingType

export const BookingType: typeof $Enums.BookingType

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type OpenGameStatus = $Enums.OpenGameStatus

export const OpenGameStatus: typeof $Enums.OpenGameStatus

export type SlotBlockReason = $Enums.SlotBlockReason

export const SlotBlockReason: typeof $Enums.SlotBlockReason

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookingSlot`: Exposes CRUD operations for the **BookingSlot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookingSlots
    * const bookingSlots = await prisma.bookingSlot.findMany()
    * ```
    */
  get bookingSlot(): Prisma.BookingSlotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.openGame`: Exposes CRUD operations for the **OpenGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OpenGames
    * const openGames = await prisma.openGame.findMany()
    * ```
    */
  get openGame(): Prisma.OpenGameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.openGameParticipant`: Exposes CRUD operations for the **OpenGameParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OpenGameParticipants
    * const openGameParticipants = await prisma.openGameParticipant.findMany()
    * ```
    */
  get openGameParticipant(): Prisma.OpenGameParticipantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.slotBlock`: Exposes CRUD operations for the **SlotBlock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SlotBlocks
    * const slotBlocks = await prisma.slotBlock.findMany()
    * ```
    */
  get slotBlock(): Prisma.SlotBlockDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Booking: 'Booking',
    BookingSlot: 'BookingSlot',
    OpenGame: 'OpenGame',
    OpenGameParticipant: 'OpenGameParticipant',
    SlotBlock: 'SlotBlock'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "booking" | "bookingSlot" | "openGame" | "openGameParticipant" | "slotBlock"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      BookingSlot: {
        payload: Prisma.$BookingSlotPayload<ExtArgs>
        fields: Prisma.BookingSlotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingSlotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingSlotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload>
          }
          findFirst: {
            args: Prisma.BookingSlotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingSlotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload>
          }
          findMany: {
            args: Prisma.BookingSlotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload>[]
          }
          create: {
            args: Prisma.BookingSlotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload>
          }
          createMany: {
            args: Prisma.BookingSlotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingSlotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload>[]
          }
          delete: {
            args: Prisma.BookingSlotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload>
          }
          update: {
            args: Prisma.BookingSlotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload>
          }
          deleteMany: {
            args: Prisma.BookingSlotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingSlotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingSlotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload>[]
          }
          upsert: {
            args: Prisma.BookingSlotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingSlotPayload>
          }
          aggregate: {
            args: Prisma.BookingSlotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookingSlot>
          }
          groupBy: {
            args: Prisma.BookingSlotGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingSlotGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingSlotCountArgs<ExtArgs>
            result: $Utils.Optional<BookingSlotCountAggregateOutputType> | number
          }
        }
      }
      OpenGame: {
        payload: Prisma.$OpenGamePayload<ExtArgs>
        fields: Prisma.OpenGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OpenGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OpenGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload>
          }
          findFirst: {
            args: Prisma.OpenGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OpenGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload>
          }
          findMany: {
            args: Prisma.OpenGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload>[]
          }
          create: {
            args: Prisma.OpenGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload>
          }
          createMany: {
            args: Prisma.OpenGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OpenGameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload>[]
          }
          delete: {
            args: Prisma.OpenGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload>
          }
          update: {
            args: Prisma.OpenGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload>
          }
          deleteMany: {
            args: Prisma.OpenGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OpenGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OpenGameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload>[]
          }
          upsert: {
            args: Prisma.OpenGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGamePayload>
          }
          aggregate: {
            args: Prisma.OpenGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOpenGame>
          }
          groupBy: {
            args: Prisma.OpenGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<OpenGameGroupByOutputType>[]
          }
          count: {
            args: Prisma.OpenGameCountArgs<ExtArgs>
            result: $Utils.Optional<OpenGameCountAggregateOutputType> | number
          }
        }
      }
      OpenGameParticipant: {
        payload: Prisma.$OpenGameParticipantPayload<ExtArgs>
        fields: Prisma.OpenGameParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OpenGameParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OpenGameParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload>
          }
          findFirst: {
            args: Prisma.OpenGameParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OpenGameParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload>
          }
          findMany: {
            args: Prisma.OpenGameParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload>[]
          }
          create: {
            args: Prisma.OpenGameParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload>
          }
          createMany: {
            args: Prisma.OpenGameParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OpenGameParticipantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload>[]
          }
          delete: {
            args: Prisma.OpenGameParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload>
          }
          update: {
            args: Prisma.OpenGameParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload>
          }
          deleteMany: {
            args: Prisma.OpenGameParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OpenGameParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OpenGameParticipantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload>[]
          }
          upsert: {
            args: Prisma.OpenGameParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpenGameParticipantPayload>
          }
          aggregate: {
            args: Prisma.OpenGameParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOpenGameParticipant>
          }
          groupBy: {
            args: Prisma.OpenGameParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<OpenGameParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.OpenGameParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<OpenGameParticipantCountAggregateOutputType> | number
          }
        }
      }
      SlotBlock: {
        payload: Prisma.$SlotBlockPayload<ExtArgs>
        fields: Prisma.SlotBlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SlotBlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SlotBlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload>
          }
          findFirst: {
            args: Prisma.SlotBlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SlotBlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload>
          }
          findMany: {
            args: Prisma.SlotBlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload>[]
          }
          create: {
            args: Prisma.SlotBlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload>
          }
          createMany: {
            args: Prisma.SlotBlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SlotBlockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload>[]
          }
          delete: {
            args: Prisma.SlotBlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload>
          }
          update: {
            args: Prisma.SlotBlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload>
          }
          deleteMany: {
            args: Prisma.SlotBlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SlotBlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SlotBlockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload>[]
          }
          upsert: {
            args: Prisma.SlotBlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotBlockPayload>
          }
          aggregate: {
            args: Prisma.SlotBlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSlotBlock>
          }
          groupBy: {
            args: Prisma.SlotBlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<SlotBlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.SlotBlockCountArgs<ExtArgs>
            result: $Utils.Optional<SlotBlockCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    booking?: BookingOmit
    bookingSlot?: BookingSlotOmit
    openGame?: OpenGameOmit
    openGameParticipant?: OpenGameParticipantOmit
    slotBlock?: SlotBlockOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    bookings: number
    openGameJoins: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs
    openGameJoins?: boolean | UserCountOutputTypeCountOpenGameJoinsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOpenGameJoinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpenGameParticipantWhereInput
  }


  /**
   * Count Type BookingCountOutputType
   */

  export type BookingCountOutputType = {
    slots: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | BookingCountOutputTypeCountSlotsArgs
  }

  // Custom InputTypes
  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: BookingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingSlotWhereInput
  }


  /**
   * Count Type OpenGameCountOutputType
   */

  export type OpenGameCountOutputType = {
    participants: number
  }

  export type OpenGameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | OpenGameCountOutputTypeCountParticipantsArgs
  }

  // Custom InputTypes
  /**
   * OpenGameCountOutputType without action
   */
  export type OpenGameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameCountOutputType
     */
    select?: OpenGameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OpenGameCountOutputType without action
   */
  export type OpenGameCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpenGameParticipantWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    phone: string
    email: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    openGameJoins?: boolean | User$openGameJoinsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "email" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    openGameJoins?: boolean | User$openGameJoinsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      openGameJoins: Prisma.$OpenGameParticipantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string
      email: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends User$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    openGameJoins<T extends User$openGameJoinsArgs<ExtArgs> = {}>(args?: Subset<T, User$openGameJoinsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.bookings
   */
  export type User$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * User.openGameJoins
   */
  export type User$openGameJoinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    where?: OpenGameParticipantWhereInput
    orderBy?: OpenGameParticipantOrderByWithRelationInput | OpenGameParticipantOrderByWithRelationInput[]
    cursor?: OpenGameParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OpenGameParticipantScalarFieldEnum | OpenGameParticipantScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    playersCount: number | null
    totalPrice: number | null
  }

  export type BookingSumAggregateOutputType = {
    playersCount: number | null
    totalPrice: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    bookingType: $Enums.BookingType | null
    status: $Enums.BookingStatus | null
    bookingDate: Date | null
    playersCount: number | null
    totalPrice: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    bookingType: $Enums.BookingType | null
    status: $Enums.BookingStatus | null
    bookingDate: Date | null
    playersCount: number | null
    totalPrice: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    userId: number
    bookingType: number
    status: number
    bookingDate: number
    playersCount: number
    totalPrice: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    playersCount?: true
    totalPrice?: true
  }

  export type BookingSumAggregateInputType = {
    playersCount?: true
    totalPrice?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    userId?: true
    bookingType?: true
    status?: true
    bookingDate?: true
    playersCount?: true
    totalPrice?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    userId?: true
    bookingType?: true
    status?: true
    bookingDate?: true
    playersCount?: true
    totalPrice?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    userId?: true
    bookingType?: true
    status?: true
    bookingDate?: true
    playersCount?: true
    totalPrice?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    userId: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date
    playersCount: number
    totalPrice: number
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bookingType?: boolean
    status?: boolean
    bookingDate?: boolean
    playersCount?: boolean
    totalPrice?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    slots?: boolean | Booking$slotsArgs<ExtArgs>
    openGame?: boolean | Booking$openGameArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bookingType?: boolean
    status?: boolean
    bookingDate?: boolean
    playersCount?: boolean
    totalPrice?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bookingType?: boolean
    status?: boolean
    bookingDate?: boolean
    playersCount?: boolean
    totalPrice?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    userId?: boolean
    bookingType?: boolean
    status?: boolean
    bookingDate?: boolean
    playersCount?: boolean
    totalPrice?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "bookingType" | "status" | "bookingDate" | "playersCount" | "totalPrice" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    slots?: boolean | Booking$slotsArgs<ExtArgs>
    openGame?: boolean | Booking$openGameArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      slots: Prisma.$BookingSlotPayload<ExtArgs>[]
      openGame: Prisma.$OpenGamePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      bookingType: $Enums.BookingType
      status: $Enums.BookingStatus
      bookingDate: Date
      playersCount: number
      totalPrice: number
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    slots<T extends Booking$slotsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$slotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    openGame<T extends Booking$openGameArgs<ExtArgs> = {}>(args?: Subset<T, Booking$openGameArgs<ExtArgs>>): Prisma__OpenGameClient<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly userId: FieldRef<"Booking", 'String'>
    readonly bookingType: FieldRef<"Booking", 'BookingType'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly bookingDate: FieldRef<"Booking", 'DateTime'>
    readonly playersCount: FieldRef<"Booking", 'Int'>
    readonly totalPrice: FieldRef<"Booking", 'Int'>
    readonly notes: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.slots
   */
  export type Booking$slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
    where?: BookingSlotWhereInput
    orderBy?: BookingSlotOrderByWithRelationInput | BookingSlotOrderByWithRelationInput[]
    cursor?: BookingSlotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingSlotScalarFieldEnum | BookingSlotScalarFieldEnum[]
  }

  /**
   * Booking.openGame
   */
  export type Booking$openGameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
    where?: OpenGameWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model BookingSlot
   */

  export type AggregateBookingSlot = {
    _count: BookingSlotCountAggregateOutputType | null
    _avg: BookingSlotAvgAggregateOutputType | null
    _sum: BookingSlotSumAggregateOutputType | null
    _min: BookingSlotMinAggregateOutputType | null
    _max: BookingSlotMaxAggregateOutputType | null
  }

  export type BookingSlotAvgAggregateOutputType = {
    startHour: number | null
    endHour: number | null
    price: number | null
  }

  export type BookingSlotSumAggregateOutputType = {
    startHour: number | null
    endHour: number | null
    price: number | null
  }

  export type BookingSlotMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    slotDate: Date | null
    startHour: number | null
    endHour: number | null
    price: number | null
    createdAt: Date | null
  }

  export type BookingSlotMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    slotDate: Date | null
    startHour: number | null
    endHour: number | null
    price: number | null
    createdAt: Date | null
  }

  export type BookingSlotCountAggregateOutputType = {
    id: number
    bookingId: number
    slotDate: number
    startHour: number
    endHour: number
    price: number
    createdAt: number
    _all: number
  }


  export type BookingSlotAvgAggregateInputType = {
    startHour?: true
    endHour?: true
    price?: true
  }

  export type BookingSlotSumAggregateInputType = {
    startHour?: true
    endHour?: true
    price?: true
  }

  export type BookingSlotMinAggregateInputType = {
    id?: true
    bookingId?: true
    slotDate?: true
    startHour?: true
    endHour?: true
    price?: true
    createdAt?: true
  }

  export type BookingSlotMaxAggregateInputType = {
    id?: true
    bookingId?: true
    slotDate?: true
    startHour?: true
    endHour?: true
    price?: true
    createdAt?: true
  }

  export type BookingSlotCountAggregateInputType = {
    id?: true
    bookingId?: true
    slotDate?: true
    startHour?: true
    endHour?: true
    price?: true
    createdAt?: true
    _all?: true
  }

  export type BookingSlotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingSlot to aggregate.
     */
    where?: BookingSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingSlots to fetch.
     */
    orderBy?: BookingSlotOrderByWithRelationInput | BookingSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookingSlots
    **/
    _count?: true | BookingSlotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingSlotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSlotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingSlotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingSlotMaxAggregateInputType
  }

  export type GetBookingSlotAggregateType<T extends BookingSlotAggregateArgs> = {
        [P in keyof T & keyof AggregateBookingSlot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookingSlot[P]>
      : GetScalarType<T[P], AggregateBookingSlot[P]>
  }




  export type BookingSlotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingSlotWhereInput
    orderBy?: BookingSlotOrderByWithAggregationInput | BookingSlotOrderByWithAggregationInput[]
    by: BookingSlotScalarFieldEnum[] | BookingSlotScalarFieldEnum
    having?: BookingSlotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingSlotCountAggregateInputType | true
    _avg?: BookingSlotAvgAggregateInputType
    _sum?: BookingSlotSumAggregateInputType
    _min?: BookingSlotMinAggregateInputType
    _max?: BookingSlotMaxAggregateInputType
  }

  export type BookingSlotGroupByOutputType = {
    id: string
    bookingId: string
    slotDate: Date
    startHour: number
    endHour: number
    price: number
    createdAt: Date
    _count: BookingSlotCountAggregateOutputType | null
    _avg: BookingSlotAvgAggregateOutputType | null
    _sum: BookingSlotSumAggregateOutputType | null
    _min: BookingSlotMinAggregateOutputType | null
    _max: BookingSlotMaxAggregateOutputType | null
  }

  type GetBookingSlotGroupByPayload<T extends BookingSlotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingSlotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingSlotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingSlotGroupByOutputType[P]>
            : GetScalarType<T[P], BookingSlotGroupByOutputType[P]>
        }
      >
    >


  export type BookingSlotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    slotDate?: boolean
    startHour?: boolean
    endHour?: boolean
    price?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookingSlot"]>

  export type BookingSlotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    slotDate?: boolean
    startHour?: boolean
    endHour?: boolean
    price?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookingSlot"]>

  export type BookingSlotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    slotDate?: boolean
    startHour?: boolean
    endHour?: boolean
    price?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookingSlot"]>

  export type BookingSlotSelectScalar = {
    id?: boolean
    bookingId?: boolean
    slotDate?: boolean
    startHour?: boolean
    endHour?: boolean
    price?: boolean
    createdAt?: boolean
  }

  export type BookingSlotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bookingId" | "slotDate" | "startHour" | "endHour" | "price" | "createdAt", ExtArgs["result"]["bookingSlot"]>
  export type BookingSlotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type BookingSlotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type BookingSlotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $BookingSlotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookingSlot"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      slotDate: Date
      startHour: number
      endHour: number
      price: number
      createdAt: Date
    }, ExtArgs["result"]["bookingSlot"]>
    composites: {}
  }

  type BookingSlotGetPayload<S extends boolean | null | undefined | BookingSlotDefaultArgs> = $Result.GetResult<Prisma.$BookingSlotPayload, S>

  type BookingSlotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingSlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingSlotCountAggregateInputType | true
    }

  export interface BookingSlotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookingSlot'], meta: { name: 'BookingSlot' } }
    /**
     * Find zero or one BookingSlot that matches the filter.
     * @param {BookingSlotFindUniqueArgs} args - Arguments to find a BookingSlot
     * @example
     * // Get one BookingSlot
     * const bookingSlot = await prisma.bookingSlot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingSlotFindUniqueArgs>(args: SelectSubset<T, BookingSlotFindUniqueArgs<ExtArgs>>): Prisma__BookingSlotClient<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookingSlot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingSlotFindUniqueOrThrowArgs} args - Arguments to find a BookingSlot
     * @example
     * // Get one BookingSlot
     * const bookingSlot = await prisma.bookingSlot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingSlotFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingSlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingSlotClient<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookingSlot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingSlotFindFirstArgs} args - Arguments to find a BookingSlot
     * @example
     * // Get one BookingSlot
     * const bookingSlot = await prisma.bookingSlot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingSlotFindFirstArgs>(args?: SelectSubset<T, BookingSlotFindFirstArgs<ExtArgs>>): Prisma__BookingSlotClient<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookingSlot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingSlotFindFirstOrThrowArgs} args - Arguments to find a BookingSlot
     * @example
     * // Get one BookingSlot
     * const bookingSlot = await prisma.bookingSlot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingSlotFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingSlotFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingSlotClient<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookingSlots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingSlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookingSlots
     * const bookingSlots = await prisma.bookingSlot.findMany()
     * 
     * // Get first 10 BookingSlots
     * const bookingSlots = await prisma.bookingSlot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingSlotWithIdOnly = await prisma.bookingSlot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingSlotFindManyArgs>(args?: SelectSubset<T, BookingSlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookingSlot.
     * @param {BookingSlotCreateArgs} args - Arguments to create a BookingSlot.
     * @example
     * // Create one BookingSlot
     * const BookingSlot = await prisma.bookingSlot.create({
     *   data: {
     *     // ... data to create a BookingSlot
     *   }
     * })
     * 
     */
    create<T extends BookingSlotCreateArgs>(args: SelectSubset<T, BookingSlotCreateArgs<ExtArgs>>): Prisma__BookingSlotClient<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookingSlots.
     * @param {BookingSlotCreateManyArgs} args - Arguments to create many BookingSlots.
     * @example
     * // Create many BookingSlots
     * const bookingSlot = await prisma.bookingSlot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingSlotCreateManyArgs>(args?: SelectSubset<T, BookingSlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookingSlots and returns the data saved in the database.
     * @param {BookingSlotCreateManyAndReturnArgs} args - Arguments to create many BookingSlots.
     * @example
     * // Create many BookingSlots
     * const bookingSlot = await prisma.bookingSlot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookingSlots and only return the `id`
     * const bookingSlotWithIdOnly = await prisma.bookingSlot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingSlotCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingSlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookingSlot.
     * @param {BookingSlotDeleteArgs} args - Arguments to delete one BookingSlot.
     * @example
     * // Delete one BookingSlot
     * const BookingSlot = await prisma.bookingSlot.delete({
     *   where: {
     *     // ... filter to delete one BookingSlot
     *   }
     * })
     * 
     */
    delete<T extends BookingSlotDeleteArgs>(args: SelectSubset<T, BookingSlotDeleteArgs<ExtArgs>>): Prisma__BookingSlotClient<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookingSlot.
     * @param {BookingSlotUpdateArgs} args - Arguments to update one BookingSlot.
     * @example
     * // Update one BookingSlot
     * const bookingSlot = await prisma.bookingSlot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingSlotUpdateArgs>(args: SelectSubset<T, BookingSlotUpdateArgs<ExtArgs>>): Prisma__BookingSlotClient<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookingSlots.
     * @param {BookingSlotDeleteManyArgs} args - Arguments to filter BookingSlots to delete.
     * @example
     * // Delete a few BookingSlots
     * const { count } = await prisma.bookingSlot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingSlotDeleteManyArgs>(args?: SelectSubset<T, BookingSlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookingSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingSlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookingSlots
     * const bookingSlot = await prisma.bookingSlot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingSlotUpdateManyArgs>(args: SelectSubset<T, BookingSlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookingSlots and returns the data updated in the database.
     * @param {BookingSlotUpdateManyAndReturnArgs} args - Arguments to update many BookingSlots.
     * @example
     * // Update many BookingSlots
     * const bookingSlot = await prisma.bookingSlot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookingSlots and only return the `id`
     * const bookingSlotWithIdOnly = await prisma.bookingSlot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingSlotUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingSlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookingSlot.
     * @param {BookingSlotUpsertArgs} args - Arguments to update or create a BookingSlot.
     * @example
     * // Update or create a BookingSlot
     * const bookingSlot = await prisma.bookingSlot.upsert({
     *   create: {
     *     // ... data to create a BookingSlot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookingSlot we want to update
     *   }
     * })
     */
    upsert<T extends BookingSlotUpsertArgs>(args: SelectSubset<T, BookingSlotUpsertArgs<ExtArgs>>): Prisma__BookingSlotClient<$Result.GetResult<Prisma.$BookingSlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookingSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingSlotCountArgs} args - Arguments to filter BookingSlots to count.
     * @example
     * // Count the number of BookingSlots
     * const count = await prisma.bookingSlot.count({
     *   where: {
     *     // ... the filter for the BookingSlots we want to count
     *   }
     * })
    **/
    count<T extends BookingSlotCountArgs>(
      args?: Subset<T, BookingSlotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingSlotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookingSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingSlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingSlotAggregateArgs>(args: Subset<T, BookingSlotAggregateArgs>): Prisma.PrismaPromise<GetBookingSlotAggregateType<T>>

    /**
     * Group by BookingSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingSlotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingSlotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingSlotGroupByArgs['orderBy'] }
        : { orderBy?: BookingSlotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingSlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookingSlot model
   */
  readonly fields: BookingSlotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookingSlot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingSlotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookingSlot model
   */
  interface BookingSlotFieldRefs {
    readonly id: FieldRef<"BookingSlot", 'String'>
    readonly bookingId: FieldRef<"BookingSlot", 'String'>
    readonly slotDate: FieldRef<"BookingSlot", 'DateTime'>
    readonly startHour: FieldRef<"BookingSlot", 'Int'>
    readonly endHour: FieldRef<"BookingSlot", 'Int'>
    readonly price: FieldRef<"BookingSlot", 'Int'>
    readonly createdAt: FieldRef<"BookingSlot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BookingSlot findUnique
   */
  export type BookingSlotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
    /**
     * Filter, which BookingSlot to fetch.
     */
    where: BookingSlotWhereUniqueInput
  }

  /**
   * BookingSlot findUniqueOrThrow
   */
  export type BookingSlotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
    /**
     * Filter, which BookingSlot to fetch.
     */
    where: BookingSlotWhereUniqueInput
  }

  /**
   * BookingSlot findFirst
   */
  export type BookingSlotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
    /**
     * Filter, which BookingSlot to fetch.
     */
    where?: BookingSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingSlots to fetch.
     */
    orderBy?: BookingSlotOrderByWithRelationInput | BookingSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingSlots.
     */
    cursor?: BookingSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingSlots.
     */
    distinct?: BookingSlotScalarFieldEnum | BookingSlotScalarFieldEnum[]
  }

  /**
   * BookingSlot findFirstOrThrow
   */
  export type BookingSlotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
    /**
     * Filter, which BookingSlot to fetch.
     */
    where?: BookingSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingSlots to fetch.
     */
    orderBy?: BookingSlotOrderByWithRelationInput | BookingSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingSlots.
     */
    cursor?: BookingSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingSlots.
     */
    distinct?: BookingSlotScalarFieldEnum | BookingSlotScalarFieldEnum[]
  }

  /**
   * BookingSlot findMany
   */
  export type BookingSlotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
    /**
     * Filter, which BookingSlots to fetch.
     */
    where?: BookingSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingSlots to fetch.
     */
    orderBy?: BookingSlotOrderByWithRelationInput | BookingSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookingSlots.
     */
    cursor?: BookingSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingSlots.
     */
    distinct?: BookingSlotScalarFieldEnum | BookingSlotScalarFieldEnum[]
  }

  /**
   * BookingSlot create
   */
  export type BookingSlotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
    /**
     * The data needed to create a BookingSlot.
     */
    data: XOR<BookingSlotCreateInput, BookingSlotUncheckedCreateInput>
  }

  /**
   * BookingSlot createMany
   */
  export type BookingSlotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookingSlots.
     */
    data: BookingSlotCreateManyInput | BookingSlotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookingSlot createManyAndReturn
   */
  export type BookingSlotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * The data used to create many BookingSlots.
     */
    data: BookingSlotCreateManyInput | BookingSlotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookingSlot update
   */
  export type BookingSlotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
    /**
     * The data needed to update a BookingSlot.
     */
    data: XOR<BookingSlotUpdateInput, BookingSlotUncheckedUpdateInput>
    /**
     * Choose, which BookingSlot to update.
     */
    where: BookingSlotWhereUniqueInput
  }

  /**
   * BookingSlot updateMany
   */
  export type BookingSlotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookingSlots.
     */
    data: XOR<BookingSlotUpdateManyMutationInput, BookingSlotUncheckedUpdateManyInput>
    /**
     * Filter which BookingSlots to update
     */
    where?: BookingSlotWhereInput
    /**
     * Limit how many BookingSlots to update.
     */
    limit?: number
  }

  /**
   * BookingSlot updateManyAndReturn
   */
  export type BookingSlotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * The data used to update BookingSlots.
     */
    data: XOR<BookingSlotUpdateManyMutationInput, BookingSlotUncheckedUpdateManyInput>
    /**
     * Filter which BookingSlots to update
     */
    where?: BookingSlotWhereInput
    /**
     * Limit how many BookingSlots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookingSlot upsert
   */
  export type BookingSlotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
    /**
     * The filter to search for the BookingSlot to update in case it exists.
     */
    where: BookingSlotWhereUniqueInput
    /**
     * In case the BookingSlot found by the `where` argument doesn't exist, create a new BookingSlot with this data.
     */
    create: XOR<BookingSlotCreateInput, BookingSlotUncheckedCreateInput>
    /**
     * In case the BookingSlot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingSlotUpdateInput, BookingSlotUncheckedUpdateInput>
  }

  /**
   * BookingSlot delete
   */
  export type BookingSlotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
    /**
     * Filter which BookingSlot to delete.
     */
    where: BookingSlotWhereUniqueInput
  }

  /**
   * BookingSlot deleteMany
   */
  export type BookingSlotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingSlots to delete
     */
    where?: BookingSlotWhereInput
    /**
     * Limit how many BookingSlots to delete.
     */
    limit?: number
  }

  /**
   * BookingSlot without action
   */
  export type BookingSlotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingSlot
     */
    select?: BookingSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingSlot
     */
    omit?: BookingSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingSlotInclude<ExtArgs> | null
  }


  /**
   * Model OpenGame
   */

  export type AggregateOpenGame = {
    _count: OpenGameCountAggregateOutputType | null
    _avg: OpenGameAvgAggregateOutputType | null
    _sum: OpenGameSumAggregateOutputType | null
    _min: OpenGameMinAggregateOutputType | null
    _max: OpenGameMaxAggregateOutputType | null
  }

  export type OpenGameAvgAggregateOutputType = {
    currentPlayers: number | null
    minPlayers: number | null
    maxPlayers: number | null
  }

  export type OpenGameSumAggregateOutputType = {
    currentPlayers: number | null
    minPlayers: number | null
    maxPlayers: number | null
  }

  export type OpenGameMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    status: $Enums.OpenGameStatus | null
    currentPlayers: number | null
    minPlayers: number | null
    maxPlayers: number | null
    cutoffTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OpenGameMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    status: $Enums.OpenGameStatus | null
    currentPlayers: number | null
    minPlayers: number | null
    maxPlayers: number | null
    cutoffTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OpenGameCountAggregateOutputType = {
    id: number
    bookingId: number
    status: number
    currentPlayers: number
    minPlayers: number
    maxPlayers: number
    cutoffTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OpenGameAvgAggregateInputType = {
    currentPlayers?: true
    minPlayers?: true
    maxPlayers?: true
  }

  export type OpenGameSumAggregateInputType = {
    currentPlayers?: true
    minPlayers?: true
    maxPlayers?: true
  }

  export type OpenGameMinAggregateInputType = {
    id?: true
    bookingId?: true
    status?: true
    currentPlayers?: true
    minPlayers?: true
    maxPlayers?: true
    cutoffTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OpenGameMaxAggregateInputType = {
    id?: true
    bookingId?: true
    status?: true
    currentPlayers?: true
    minPlayers?: true
    maxPlayers?: true
    cutoffTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OpenGameCountAggregateInputType = {
    id?: true
    bookingId?: true
    status?: true
    currentPlayers?: true
    minPlayers?: true
    maxPlayers?: true
    cutoffTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OpenGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OpenGame to aggregate.
     */
    where?: OpenGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenGames to fetch.
     */
    orderBy?: OpenGameOrderByWithRelationInput | OpenGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OpenGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OpenGames
    **/
    _count?: true | OpenGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OpenGameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OpenGameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OpenGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OpenGameMaxAggregateInputType
  }

  export type GetOpenGameAggregateType<T extends OpenGameAggregateArgs> = {
        [P in keyof T & keyof AggregateOpenGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOpenGame[P]>
      : GetScalarType<T[P], AggregateOpenGame[P]>
  }




  export type OpenGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpenGameWhereInput
    orderBy?: OpenGameOrderByWithAggregationInput | OpenGameOrderByWithAggregationInput[]
    by: OpenGameScalarFieldEnum[] | OpenGameScalarFieldEnum
    having?: OpenGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OpenGameCountAggregateInputType | true
    _avg?: OpenGameAvgAggregateInputType
    _sum?: OpenGameSumAggregateInputType
    _min?: OpenGameMinAggregateInputType
    _max?: OpenGameMaxAggregateInputType
  }

  export type OpenGameGroupByOutputType = {
    id: string
    bookingId: string
    status: $Enums.OpenGameStatus
    currentPlayers: number
    minPlayers: number
    maxPlayers: number
    cutoffTime: Date
    createdAt: Date
    updatedAt: Date
    _count: OpenGameCountAggregateOutputType | null
    _avg: OpenGameAvgAggregateOutputType | null
    _sum: OpenGameSumAggregateOutputType | null
    _min: OpenGameMinAggregateOutputType | null
    _max: OpenGameMaxAggregateOutputType | null
  }

  type GetOpenGameGroupByPayload<T extends OpenGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OpenGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OpenGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OpenGameGroupByOutputType[P]>
            : GetScalarType<T[P], OpenGameGroupByOutputType[P]>
        }
      >
    >


  export type OpenGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    status?: boolean
    currentPlayers?: boolean
    minPlayers?: boolean
    maxPlayers?: boolean
    cutoffTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    participants?: boolean | OpenGame$participantsArgs<ExtArgs>
    _count?: boolean | OpenGameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["openGame"]>

  export type OpenGameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    status?: boolean
    currentPlayers?: boolean
    minPlayers?: boolean
    maxPlayers?: boolean
    cutoffTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["openGame"]>

  export type OpenGameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    status?: boolean
    currentPlayers?: boolean
    minPlayers?: boolean
    maxPlayers?: boolean
    cutoffTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["openGame"]>

  export type OpenGameSelectScalar = {
    id?: boolean
    bookingId?: boolean
    status?: boolean
    currentPlayers?: boolean
    minPlayers?: boolean
    maxPlayers?: boolean
    cutoffTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OpenGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bookingId" | "status" | "currentPlayers" | "minPlayers" | "maxPlayers" | "cutoffTime" | "createdAt" | "updatedAt", ExtArgs["result"]["openGame"]>
  export type OpenGameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    participants?: boolean | OpenGame$participantsArgs<ExtArgs>
    _count?: boolean | OpenGameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OpenGameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type OpenGameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $OpenGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OpenGame"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
      participants: Prisma.$OpenGameParticipantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      status: $Enums.OpenGameStatus
      currentPlayers: number
      minPlayers: number
      maxPlayers: number
      cutoffTime: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["openGame"]>
    composites: {}
  }

  type OpenGameGetPayload<S extends boolean | null | undefined | OpenGameDefaultArgs> = $Result.GetResult<Prisma.$OpenGamePayload, S>

  type OpenGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OpenGameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OpenGameCountAggregateInputType | true
    }

  export interface OpenGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OpenGame'], meta: { name: 'OpenGame' } }
    /**
     * Find zero or one OpenGame that matches the filter.
     * @param {OpenGameFindUniqueArgs} args - Arguments to find a OpenGame
     * @example
     * // Get one OpenGame
     * const openGame = await prisma.openGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OpenGameFindUniqueArgs>(args: SelectSubset<T, OpenGameFindUniqueArgs<ExtArgs>>): Prisma__OpenGameClient<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OpenGame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OpenGameFindUniqueOrThrowArgs} args - Arguments to find a OpenGame
     * @example
     * // Get one OpenGame
     * const openGame = await prisma.openGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OpenGameFindUniqueOrThrowArgs>(args: SelectSubset<T, OpenGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OpenGameClient<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OpenGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameFindFirstArgs} args - Arguments to find a OpenGame
     * @example
     * // Get one OpenGame
     * const openGame = await prisma.openGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OpenGameFindFirstArgs>(args?: SelectSubset<T, OpenGameFindFirstArgs<ExtArgs>>): Prisma__OpenGameClient<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OpenGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameFindFirstOrThrowArgs} args - Arguments to find a OpenGame
     * @example
     * // Get one OpenGame
     * const openGame = await prisma.openGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OpenGameFindFirstOrThrowArgs>(args?: SelectSubset<T, OpenGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__OpenGameClient<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OpenGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OpenGames
     * const openGames = await prisma.openGame.findMany()
     * 
     * // Get first 10 OpenGames
     * const openGames = await prisma.openGame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const openGameWithIdOnly = await prisma.openGame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OpenGameFindManyArgs>(args?: SelectSubset<T, OpenGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OpenGame.
     * @param {OpenGameCreateArgs} args - Arguments to create a OpenGame.
     * @example
     * // Create one OpenGame
     * const OpenGame = await prisma.openGame.create({
     *   data: {
     *     // ... data to create a OpenGame
     *   }
     * })
     * 
     */
    create<T extends OpenGameCreateArgs>(args: SelectSubset<T, OpenGameCreateArgs<ExtArgs>>): Prisma__OpenGameClient<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OpenGames.
     * @param {OpenGameCreateManyArgs} args - Arguments to create many OpenGames.
     * @example
     * // Create many OpenGames
     * const openGame = await prisma.openGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OpenGameCreateManyArgs>(args?: SelectSubset<T, OpenGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OpenGames and returns the data saved in the database.
     * @param {OpenGameCreateManyAndReturnArgs} args - Arguments to create many OpenGames.
     * @example
     * // Create many OpenGames
     * const openGame = await prisma.openGame.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OpenGames and only return the `id`
     * const openGameWithIdOnly = await prisma.openGame.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OpenGameCreateManyAndReturnArgs>(args?: SelectSubset<T, OpenGameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OpenGame.
     * @param {OpenGameDeleteArgs} args - Arguments to delete one OpenGame.
     * @example
     * // Delete one OpenGame
     * const OpenGame = await prisma.openGame.delete({
     *   where: {
     *     // ... filter to delete one OpenGame
     *   }
     * })
     * 
     */
    delete<T extends OpenGameDeleteArgs>(args: SelectSubset<T, OpenGameDeleteArgs<ExtArgs>>): Prisma__OpenGameClient<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OpenGame.
     * @param {OpenGameUpdateArgs} args - Arguments to update one OpenGame.
     * @example
     * // Update one OpenGame
     * const openGame = await prisma.openGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OpenGameUpdateArgs>(args: SelectSubset<T, OpenGameUpdateArgs<ExtArgs>>): Prisma__OpenGameClient<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OpenGames.
     * @param {OpenGameDeleteManyArgs} args - Arguments to filter OpenGames to delete.
     * @example
     * // Delete a few OpenGames
     * const { count } = await prisma.openGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OpenGameDeleteManyArgs>(args?: SelectSubset<T, OpenGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OpenGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OpenGames
     * const openGame = await prisma.openGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OpenGameUpdateManyArgs>(args: SelectSubset<T, OpenGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OpenGames and returns the data updated in the database.
     * @param {OpenGameUpdateManyAndReturnArgs} args - Arguments to update many OpenGames.
     * @example
     * // Update many OpenGames
     * const openGame = await prisma.openGame.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OpenGames and only return the `id`
     * const openGameWithIdOnly = await prisma.openGame.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OpenGameUpdateManyAndReturnArgs>(args: SelectSubset<T, OpenGameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OpenGame.
     * @param {OpenGameUpsertArgs} args - Arguments to update or create a OpenGame.
     * @example
     * // Update or create a OpenGame
     * const openGame = await prisma.openGame.upsert({
     *   create: {
     *     // ... data to create a OpenGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OpenGame we want to update
     *   }
     * })
     */
    upsert<T extends OpenGameUpsertArgs>(args: SelectSubset<T, OpenGameUpsertArgs<ExtArgs>>): Prisma__OpenGameClient<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OpenGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameCountArgs} args - Arguments to filter OpenGames to count.
     * @example
     * // Count the number of OpenGames
     * const count = await prisma.openGame.count({
     *   where: {
     *     // ... the filter for the OpenGames we want to count
     *   }
     * })
    **/
    count<T extends OpenGameCountArgs>(
      args?: Subset<T, OpenGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OpenGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OpenGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OpenGameAggregateArgs>(args: Subset<T, OpenGameAggregateArgs>): Prisma.PrismaPromise<GetOpenGameAggregateType<T>>

    /**
     * Group by OpenGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OpenGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OpenGameGroupByArgs['orderBy'] }
        : { orderBy?: OpenGameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OpenGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOpenGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OpenGame model
   */
  readonly fields: OpenGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OpenGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OpenGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    participants<T extends OpenGame$participantsArgs<ExtArgs> = {}>(args?: Subset<T, OpenGame$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OpenGame model
   */
  interface OpenGameFieldRefs {
    readonly id: FieldRef<"OpenGame", 'String'>
    readonly bookingId: FieldRef<"OpenGame", 'String'>
    readonly status: FieldRef<"OpenGame", 'OpenGameStatus'>
    readonly currentPlayers: FieldRef<"OpenGame", 'Int'>
    readonly minPlayers: FieldRef<"OpenGame", 'Int'>
    readonly maxPlayers: FieldRef<"OpenGame", 'Int'>
    readonly cutoffTime: FieldRef<"OpenGame", 'DateTime'>
    readonly createdAt: FieldRef<"OpenGame", 'DateTime'>
    readonly updatedAt: FieldRef<"OpenGame", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OpenGame findUnique
   */
  export type OpenGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
    /**
     * Filter, which OpenGame to fetch.
     */
    where: OpenGameWhereUniqueInput
  }

  /**
   * OpenGame findUniqueOrThrow
   */
  export type OpenGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
    /**
     * Filter, which OpenGame to fetch.
     */
    where: OpenGameWhereUniqueInput
  }

  /**
   * OpenGame findFirst
   */
  export type OpenGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
    /**
     * Filter, which OpenGame to fetch.
     */
    where?: OpenGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenGames to fetch.
     */
    orderBy?: OpenGameOrderByWithRelationInput | OpenGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OpenGames.
     */
    cursor?: OpenGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpenGames.
     */
    distinct?: OpenGameScalarFieldEnum | OpenGameScalarFieldEnum[]
  }

  /**
   * OpenGame findFirstOrThrow
   */
  export type OpenGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
    /**
     * Filter, which OpenGame to fetch.
     */
    where?: OpenGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenGames to fetch.
     */
    orderBy?: OpenGameOrderByWithRelationInput | OpenGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OpenGames.
     */
    cursor?: OpenGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpenGames.
     */
    distinct?: OpenGameScalarFieldEnum | OpenGameScalarFieldEnum[]
  }

  /**
   * OpenGame findMany
   */
  export type OpenGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
    /**
     * Filter, which OpenGames to fetch.
     */
    where?: OpenGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenGames to fetch.
     */
    orderBy?: OpenGameOrderByWithRelationInput | OpenGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OpenGames.
     */
    cursor?: OpenGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpenGames.
     */
    distinct?: OpenGameScalarFieldEnum | OpenGameScalarFieldEnum[]
  }

  /**
   * OpenGame create
   */
  export type OpenGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
    /**
     * The data needed to create a OpenGame.
     */
    data: XOR<OpenGameCreateInput, OpenGameUncheckedCreateInput>
  }

  /**
   * OpenGame createMany
   */
  export type OpenGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OpenGames.
     */
    data: OpenGameCreateManyInput | OpenGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OpenGame createManyAndReturn
   */
  export type OpenGameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * The data used to create many OpenGames.
     */
    data: OpenGameCreateManyInput | OpenGameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OpenGame update
   */
  export type OpenGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
    /**
     * The data needed to update a OpenGame.
     */
    data: XOR<OpenGameUpdateInput, OpenGameUncheckedUpdateInput>
    /**
     * Choose, which OpenGame to update.
     */
    where: OpenGameWhereUniqueInput
  }

  /**
   * OpenGame updateMany
   */
  export type OpenGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OpenGames.
     */
    data: XOR<OpenGameUpdateManyMutationInput, OpenGameUncheckedUpdateManyInput>
    /**
     * Filter which OpenGames to update
     */
    where?: OpenGameWhereInput
    /**
     * Limit how many OpenGames to update.
     */
    limit?: number
  }

  /**
   * OpenGame updateManyAndReturn
   */
  export type OpenGameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * The data used to update OpenGames.
     */
    data: XOR<OpenGameUpdateManyMutationInput, OpenGameUncheckedUpdateManyInput>
    /**
     * Filter which OpenGames to update
     */
    where?: OpenGameWhereInput
    /**
     * Limit how many OpenGames to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OpenGame upsert
   */
  export type OpenGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
    /**
     * The filter to search for the OpenGame to update in case it exists.
     */
    where: OpenGameWhereUniqueInput
    /**
     * In case the OpenGame found by the `where` argument doesn't exist, create a new OpenGame with this data.
     */
    create: XOR<OpenGameCreateInput, OpenGameUncheckedCreateInput>
    /**
     * In case the OpenGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OpenGameUpdateInput, OpenGameUncheckedUpdateInput>
  }

  /**
   * OpenGame delete
   */
  export type OpenGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
    /**
     * Filter which OpenGame to delete.
     */
    where: OpenGameWhereUniqueInput
  }

  /**
   * OpenGame deleteMany
   */
  export type OpenGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OpenGames to delete
     */
    where?: OpenGameWhereInput
    /**
     * Limit how many OpenGames to delete.
     */
    limit?: number
  }

  /**
   * OpenGame.participants
   */
  export type OpenGame$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    where?: OpenGameParticipantWhereInput
    orderBy?: OpenGameParticipantOrderByWithRelationInput | OpenGameParticipantOrderByWithRelationInput[]
    cursor?: OpenGameParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OpenGameParticipantScalarFieldEnum | OpenGameParticipantScalarFieldEnum[]
  }

  /**
   * OpenGame without action
   */
  export type OpenGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGame
     */
    select?: OpenGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGame
     */
    omit?: OpenGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameInclude<ExtArgs> | null
  }


  /**
   * Model OpenGameParticipant
   */

  export type AggregateOpenGameParticipant = {
    _count: OpenGameParticipantCountAggregateOutputType | null
    _avg: OpenGameParticipantAvgAggregateOutputType | null
    _sum: OpenGameParticipantSumAggregateOutputType | null
    _min: OpenGameParticipantMinAggregateOutputType | null
    _max: OpenGameParticipantMaxAggregateOutputType | null
  }

  export type OpenGameParticipantAvgAggregateOutputType = {
    playersJoined: number | null
  }

  export type OpenGameParticipantSumAggregateOutputType = {
    playersJoined: number | null
  }

  export type OpenGameParticipantMinAggregateOutputType = {
    id: string | null
    openGameId: string | null
    userId: string | null
    playersJoined: number | null
    createdAt: Date | null
  }

  export type OpenGameParticipantMaxAggregateOutputType = {
    id: string | null
    openGameId: string | null
    userId: string | null
    playersJoined: number | null
    createdAt: Date | null
  }

  export type OpenGameParticipantCountAggregateOutputType = {
    id: number
    openGameId: number
    userId: number
    playersJoined: number
    createdAt: number
    _all: number
  }


  export type OpenGameParticipantAvgAggregateInputType = {
    playersJoined?: true
  }

  export type OpenGameParticipantSumAggregateInputType = {
    playersJoined?: true
  }

  export type OpenGameParticipantMinAggregateInputType = {
    id?: true
    openGameId?: true
    userId?: true
    playersJoined?: true
    createdAt?: true
  }

  export type OpenGameParticipantMaxAggregateInputType = {
    id?: true
    openGameId?: true
    userId?: true
    playersJoined?: true
    createdAt?: true
  }

  export type OpenGameParticipantCountAggregateInputType = {
    id?: true
    openGameId?: true
    userId?: true
    playersJoined?: true
    createdAt?: true
    _all?: true
  }

  export type OpenGameParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OpenGameParticipant to aggregate.
     */
    where?: OpenGameParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenGameParticipants to fetch.
     */
    orderBy?: OpenGameParticipantOrderByWithRelationInput | OpenGameParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OpenGameParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenGameParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenGameParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OpenGameParticipants
    **/
    _count?: true | OpenGameParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OpenGameParticipantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OpenGameParticipantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OpenGameParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OpenGameParticipantMaxAggregateInputType
  }

  export type GetOpenGameParticipantAggregateType<T extends OpenGameParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateOpenGameParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOpenGameParticipant[P]>
      : GetScalarType<T[P], AggregateOpenGameParticipant[P]>
  }




  export type OpenGameParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpenGameParticipantWhereInput
    orderBy?: OpenGameParticipantOrderByWithAggregationInput | OpenGameParticipantOrderByWithAggregationInput[]
    by: OpenGameParticipantScalarFieldEnum[] | OpenGameParticipantScalarFieldEnum
    having?: OpenGameParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OpenGameParticipantCountAggregateInputType | true
    _avg?: OpenGameParticipantAvgAggregateInputType
    _sum?: OpenGameParticipantSumAggregateInputType
    _min?: OpenGameParticipantMinAggregateInputType
    _max?: OpenGameParticipantMaxAggregateInputType
  }

  export type OpenGameParticipantGroupByOutputType = {
    id: string
    openGameId: string
    userId: string
    playersJoined: number
    createdAt: Date
    _count: OpenGameParticipantCountAggregateOutputType | null
    _avg: OpenGameParticipantAvgAggregateOutputType | null
    _sum: OpenGameParticipantSumAggregateOutputType | null
    _min: OpenGameParticipantMinAggregateOutputType | null
    _max: OpenGameParticipantMaxAggregateOutputType | null
  }

  type GetOpenGameParticipantGroupByPayload<T extends OpenGameParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OpenGameParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OpenGameParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OpenGameParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], OpenGameParticipantGroupByOutputType[P]>
        }
      >
    >


  export type OpenGameParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    openGameId?: boolean
    userId?: boolean
    playersJoined?: boolean
    createdAt?: boolean
    openGame?: boolean | OpenGameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["openGameParticipant"]>

  export type OpenGameParticipantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    openGameId?: boolean
    userId?: boolean
    playersJoined?: boolean
    createdAt?: boolean
    openGame?: boolean | OpenGameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["openGameParticipant"]>

  export type OpenGameParticipantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    openGameId?: boolean
    userId?: boolean
    playersJoined?: boolean
    createdAt?: boolean
    openGame?: boolean | OpenGameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["openGameParticipant"]>

  export type OpenGameParticipantSelectScalar = {
    id?: boolean
    openGameId?: boolean
    userId?: boolean
    playersJoined?: boolean
    createdAt?: boolean
  }

  export type OpenGameParticipantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "openGameId" | "userId" | "playersJoined" | "createdAt", ExtArgs["result"]["openGameParticipant"]>
  export type OpenGameParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    openGame?: boolean | OpenGameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OpenGameParticipantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    openGame?: boolean | OpenGameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OpenGameParticipantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    openGame?: boolean | OpenGameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OpenGameParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OpenGameParticipant"
    objects: {
      openGame: Prisma.$OpenGamePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      openGameId: string
      userId: string
      playersJoined: number
      createdAt: Date
    }, ExtArgs["result"]["openGameParticipant"]>
    composites: {}
  }

  type OpenGameParticipantGetPayload<S extends boolean | null | undefined | OpenGameParticipantDefaultArgs> = $Result.GetResult<Prisma.$OpenGameParticipantPayload, S>

  type OpenGameParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OpenGameParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OpenGameParticipantCountAggregateInputType | true
    }

  export interface OpenGameParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OpenGameParticipant'], meta: { name: 'OpenGameParticipant' } }
    /**
     * Find zero or one OpenGameParticipant that matches the filter.
     * @param {OpenGameParticipantFindUniqueArgs} args - Arguments to find a OpenGameParticipant
     * @example
     * // Get one OpenGameParticipant
     * const openGameParticipant = await prisma.openGameParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OpenGameParticipantFindUniqueArgs>(args: SelectSubset<T, OpenGameParticipantFindUniqueArgs<ExtArgs>>): Prisma__OpenGameParticipantClient<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OpenGameParticipant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OpenGameParticipantFindUniqueOrThrowArgs} args - Arguments to find a OpenGameParticipant
     * @example
     * // Get one OpenGameParticipant
     * const openGameParticipant = await prisma.openGameParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OpenGameParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, OpenGameParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OpenGameParticipantClient<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OpenGameParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameParticipantFindFirstArgs} args - Arguments to find a OpenGameParticipant
     * @example
     * // Get one OpenGameParticipant
     * const openGameParticipant = await prisma.openGameParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OpenGameParticipantFindFirstArgs>(args?: SelectSubset<T, OpenGameParticipantFindFirstArgs<ExtArgs>>): Prisma__OpenGameParticipantClient<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OpenGameParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameParticipantFindFirstOrThrowArgs} args - Arguments to find a OpenGameParticipant
     * @example
     * // Get one OpenGameParticipant
     * const openGameParticipant = await prisma.openGameParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OpenGameParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, OpenGameParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__OpenGameParticipantClient<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OpenGameParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OpenGameParticipants
     * const openGameParticipants = await prisma.openGameParticipant.findMany()
     * 
     * // Get first 10 OpenGameParticipants
     * const openGameParticipants = await prisma.openGameParticipant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const openGameParticipantWithIdOnly = await prisma.openGameParticipant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OpenGameParticipantFindManyArgs>(args?: SelectSubset<T, OpenGameParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OpenGameParticipant.
     * @param {OpenGameParticipantCreateArgs} args - Arguments to create a OpenGameParticipant.
     * @example
     * // Create one OpenGameParticipant
     * const OpenGameParticipant = await prisma.openGameParticipant.create({
     *   data: {
     *     // ... data to create a OpenGameParticipant
     *   }
     * })
     * 
     */
    create<T extends OpenGameParticipantCreateArgs>(args: SelectSubset<T, OpenGameParticipantCreateArgs<ExtArgs>>): Prisma__OpenGameParticipantClient<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OpenGameParticipants.
     * @param {OpenGameParticipantCreateManyArgs} args - Arguments to create many OpenGameParticipants.
     * @example
     * // Create many OpenGameParticipants
     * const openGameParticipant = await prisma.openGameParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OpenGameParticipantCreateManyArgs>(args?: SelectSubset<T, OpenGameParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OpenGameParticipants and returns the data saved in the database.
     * @param {OpenGameParticipantCreateManyAndReturnArgs} args - Arguments to create many OpenGameParticipants.
     * @example
     * // Create many OpenGameParticipants
     * const openGameParticipant = await prisma.openGameParticipant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OpenGameParticipants and only return the `id`
     * const openGameParticipantWithIdOnly = await prisma.openGameParticipant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OpenGameParticipantCreateManyAndReturnArgs>(args?: SelectSubset<T, OpenGameParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OpenGameParticipant.
     * @param {OpenGameParticipantDeleteArgs} args - Arguments to delete one OpenGameParticipant.
     * @example
     * // Delete one OpenGameParticipant
     * const OpenGameParticipant = await prisma.openGameParticipant.delete({
     *   where: {
     *     // ... filter to delete one OpenGameParticipant
     *   }
     * })
     * 
     */
    delete<T extends OpenGameParticipantDeleteArgs>(args: SelectSubset<T, OpenGameParticipantDeleteArgs<ExtArgs>>): Prisma__OpenGameParticipantClient<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OpenGameParticipant.
     * @param {OpenGameParticipantUpdateArgs} args - Arguments to update one OpenGameParticipant.
     * @example
     * // Update one OpenGameParticipant
     * const openGameParticipant = await prisma.openGameParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OpenGameParticipantUpdateArgs>(args: SelectSubset<T, OpenGameParticipantUpdateArgs<ExtArgs>>): Prisma__OpenGameParticipantClient<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OpenGameParticipants.
     * @param {OpenGameParticipantDeleteManyArgs} args - Arguments to filter OpenGameParticipants to delete.
     * @example
     * // Delete a few OpenGameParticipants
     * const { count } = await prisma.openGameParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OpenGameParticipantDeleteManyArgs>(args?: SelectSubset<T, OpenGameParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OpenGameParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OpenGameParticipants
     * const openGameParticipant = await prisma.openGameParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OpenGameParticipantUpdateManyArgs>(args: SelectSubset<T, OpenGameParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OpenGameParticipants and returns the data updated in the database.
     * @param {OpenGameParticipantUpdateManyAndReturnArgs} args - Arguments to update many OpenGameParticipants.
     * @example
     * // Update many OpenGameParticipants
     * const openGameParticipant = await prisma.openGameParticipant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OpenGameParticipants and only return the `id`
     * const openGameParticipantWithIdOnly = await prisma.openGameParticipant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OpenGameParticipantUpdateManyAndReturnArgs>(args: SelectSubset<T, OpenGameParticipantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OpenGameParticipant.
     * @param {OpenGameParticipantUpsertArgs} args - Arguments to update or create a OpenGameParticipant.
     * @example
     * // Update or create a OpenGameParticipant
     * const openGameParticipant = await prisma.openGameParticipant.upsert({
     *   create: {
     *     // ... data to create a OpenGameParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OpenGameParticipant we want to update
     *   }
     * })
     */
    upsert<T extends OpenGameParticipantUpsertArgs>(args: SelectSubset<T, OpenGameParticipantUpsertArgs<ExtArgs>>): Prisma__OpenGameParticipantClient<$Result.GetResult<Prisma.$OpenGameParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OpenGameParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameParticipantCountArgs} args - Arguments to filter OpenGameParticipants to count.
     * @example
     * // Count the number of OpenGameParticipants
     * const count = await prisma.openGameParticipant.count({
     *   where: {
     *     // ... the filter for the OpenGameParticipants we want to count
     *   }
     * })
    **/
    count<T extends OpenGameParticipantCountArgs>(
      args?: Subset<T, OpenGameParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OpenGameParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OpenGameParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OpenGameParticipantAggregateArgs>(args: Subset<T, OpenGameParticipantAggregateArgs>): Prisma.PrismaPromise<GetOpenGameParticipantAggregateType<T>>

    /**
     * Group by OpenGameParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenGameParticipantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OpenGameParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OpenGameParticipantGroupByArgs['orderBy'] }
        : { orderBy?: OpenGameParticipantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OpenGameParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOpenGameParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OpenGameParticipant model
   */
  readonly fields: OpenGameParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OpenGameParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OpenGameParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    openGame<T extends OpenGameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OpenGameDefaultArgs<ExtArgs>>): Prisma__OpenGameClient<$Result.GetResult<Prisma.$OpenGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OpenGameParticipant model
   */
  interface OpenGameParticipantFieldRefs {
    readonly id: FieldRef<"OpenGameParticipant", 'String'>
    readonly openGameId: FieldRef<"OpenGameParticipant", 'String'>
    readonly userId: FieldRef<"OpenGameParticipant", 'String'>
    readonly playersJoined: FieldRef<"OpenGameParticipant", 'Int'>
    readonly createdAt: FieldRef<"OpenGameParticipant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OpenGameParticipant findUnique
   */
  export type OpenGameParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    /**
     * Filter, which OpenGameParticipant to fetch.
     */
    where: OpenGameParticipantWhereUniqueInput
  }

  /**
   * OpenGameParticipant findUniqueOrThrow
   */
  export type OpenGameParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    /**
     * Filter, which OpenGameParticipant to fetch.
     */
    where: OpenGameParticipantWhereUniqueInput
  }

  /**
   * OpenGameParticipant findFirst
   */
  export type OpenGameParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    /**
     * Filter, which OpenGameParticipant to fetch.
     */
    where?: OpenGameParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenGameParticipants to fetch.
     */
    orderBy?: OpenGameParticipantOrderByWithRelationInput | OpenGameParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OpenGameParticipants.
     */
    cursor?: OpenGameParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenGameParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenGameParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpenGameParticipants.
     */
    distinct?: OpenGameParticipantScalarFieldEnum | OpenGameParticipantScalarFieldEnum[]
  }

  /**
   * OpenGameParticipant findFirstOrThrow
   */
  export type OpenGameParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    /**
     * Filter, which OpenGameParticipant to fetch.
     */
    where?: OpenGameParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenGameParticipants to fetch.
     */
    orderBy?: OpenGameParticipantOrderByWithRelationInput | OpenGameParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OpenGameParticipants.
     */
    cursor?: OpenGameParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenGameParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenGameParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpenGameParticipants.
     */
    distinct?: OpenGameParticipantScalarFieldEnum | OpenGameParticipantScalarFieldEnum[]
  }

  /**
   * OpenGameParticipant findMany
   */
  export type OpenGameParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    /**
     * Filter, which OpenGameParticipants to fetch.
     */
    where?: OpenGameParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenGameParticipants to fetch.
     */
    orderBy?: OpenGameParticipantOrderByWithRelationInput | OpenGameParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OpenGameParticipants.
     */
    cursor?: OpenGameParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenGameParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenGameParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpenGameParticipants.
     */
    distinct?: OpenGameParticipantScalarFieldEnum | OpenGameParticipantScalarFieldEnum[]
  }

  /**
   * OpenGameParticipant create
   */
  export type OpenGameParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a OpenGameParticipant.
     */
    data: XOR<OpenGameParticipantCreateInput, OpenGameParticipantUncheckedCreateInput>
  }

  /**
   * OpenGameParticipant createMany
   */
  export type OpenGameParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OpenGameParticipants.
     */
    data: OpenGameParticipantCreateManyInput | OpenGameParticipantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OpenGameParticipant createManyAndReturn
   */
  export type OpenGameParticipantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * The data used to create many OpenGameParticipants.
     */
    data: OpenGameParticipantCreateManyInput | OpenGameParticipantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OpenGameParticipant update
   */
  export type OpenGameParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a OpenGameParticipant.
     */
    data: XOR<OpenGameParticipantUpdateInput, OpenGameParticipantUncheckedUpdateInput>
    /**
     * Choose, which OpenGameParticipant to update.
     */
    where: OpenGameParticipantWhereUniqueInput
  }

  /**
   * OpenGameParticipant updateMany
   */
  export type OpenGameParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OpenGameParticipants.
     */
    data: XOR<OpenGameParticipantUpdateManyMutationInput, OpenGameParticipantUncheckedUpdateManyInput>
    /**
     * Filter which OpenGameParticipants to update
     */
    where?: OpenGameParticipantWhereInput
    /**
     * Limit how many OpenGameParticipants to update.
     */
    limit?: number
  }

  /**
   * OpenGameParticipant updateManyAndReturn
   */
  export type OpenGameParticipantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * The data used to update OpenGameParticipants.
     */
    data: XOR<OpenGameParticipantUpdateManyMutationInput, OpenGameParticipantUncheckedUpdateManyInput>
    /**
     * Filter which OpenGameParticipants to update
     */
    where?: OpenGameParticipantWhereInput
    /**
     * Limit how many OpenGameParticipants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OpenGameParticipant upsert
   */
  export type OpenGameParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the OpenGameParticipant to update in case it exists.
     */
    where: OpenGameParticipantWhereUniqueInput
    /**
     * In case the OpenGameParticipant found by the `where` argument doesn't exist, create a new OpenGameParticipant with this data.
     */
    create: XOR<OpenGameParticipantCreateInput, OpenGameParticipantUncheckedCreateInput>
    /**
     * In case the OpenGameParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OpenGameParticipantUpdateInput, OpenGameParticipantUncheckedUpdateInput>
  }

  /**
   * OpenGameParticipant delete
   */
  export type OpenGameParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
    /**
     * Filter which OpenGameParticipant to delete.
     */
    where: OpenGameParticipantWhereUniqueInput
  }

  /**
   * OpenGameParticipant deleteMany
   */
  export type OpenGameParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OpenGameParticipants to delete
     */
    where?: OpenGameParticipantWhereInput
    /**
     * Limit how many OpenGameParticipants to delete.
     */
    limit?: number
  }

  /**
   * OpenGameParticipant without action
   */
  export type OpenGameParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenGameParticipant
     */
    select?: OpenGameParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpenGameParticipant
     */
    omit?: OpenGameParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpenGameParticipantInclude<ExtArgs> | null
  }


  /**
   * Model SlotBlock
   */

  export type AggregateSlotBlock = {
    _count: SlotBlockCountAggregateOutputType | null
    _avg: SlotBlockAvgAggregateOutputType | null
    _sum: SlotBlockSumAggregateOutputType | null
    _min: SlotBlockMinAggregateOutputType | null
    _max: SlotBlockMaxAggregateOutputType | null
  }

  export type SlotBlockAvgAggregateOutputType = {
    startHour: number | null
    endHour: number | null
  }

  export type SlotBlockSumAggregateOutputType = {
    startHour: number | null
    endHour: number | null
  }

  export type SlotBlockMinAggregateOutputType = {
    id: string | null
    blockDate: Date | null
    startHour: number | null
    endHour: number | null
    reason: $Enums.SlotBlockReason | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SlotBlockMaxAggregateOutputType = {
    id: string | null
    blockDate: Date | null
    startHour: number | null
    endHour: number | null
    reason: $Enums.SlotBlockReason | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SlotBlockCountAggregateOutputType = {
    id: number
    blockDate: number
    startHour: number
    endHour: number
    reason: number
    note: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SlotBlockAvgAggregateInputType = {
    startHour?: true
    endHour?: true
  }

  export type SlotBlockSumAggregateInputType = {
    startHour?: true
    endHour?: true
  }

  export type SlotBlockMinAggregateInputType = {
    id?: true
    blockDate?: true
    startHour?: true
    endHour?: true
    reason?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SlotBlockMaxAggregateInputType = {
    id?: true
    blockDate?: true
    startHour?: true
    endHour?: true
    reason?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SlotBlockCountAggregateInputType = {
    id?: true
    blockDate?: true
    startHour?: true
    endHour?: true
    reason?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SlotBlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SlotBlock to aggregate.
     */
    where?: SlotBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SlotBlocks to fetch.
     */
    orderBy?: SlotBlockOrderByWithRelationInput | SlotBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SlotBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SlotBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SlotBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SlotBlocks
    **/
    _count?: true | SlotBlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SlotBlockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SlotBlockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SlotBlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SlotBlockMaxAggregateInputType
  }

  export type GetSlotBlockAggregateType<T extends SlotBlockAggregateArgs> = {
        [P in keyof T & keyof AggregateSlotBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSlotBlock[P]>
      : GetScalarType<T[P], AggregateSlotBlock[P]>
  }




  export type SlotBlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SlotBlockWhereInput
    orderBy?: SlotBlockOrderByWithAggregationInput | SlotBlockOrderByWithAggregationInput[]
    by: SlotBlockScalarFieldEnum[] | SlotBlockScalarFieldEnum
    having?: SlotBlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SlotBlockCountAggregateInputType | true
    _avg?: SlotBlockAvgAggregateInputType
    _sum?: SlotBlockSumAggregateInputType
    _min?: SlotBlockMinAggregateInputType
    _max?: SlotBlockMaxAggregateInputType
  }

  export type SlotBlockGroupByOutputType = {
    id: string
    blockDate: Date
    startHour: number
    endHour: number
    reason: $Enums.SlotBlockReason
    note: string | null
    createdAt: Date
    updatedAt: Date
    _count: SlotBlockCountAggregateOutputType | null
    _avg: SlotBlockAvgAggregateOutputType | null
    _sum: SlotBlockSumAggregateOutputType | null
    _min: SlotBlockMinAggregateOutputType | null
    _max: SlotBlockMaxAggregateOutputType | null
  }

  type GetSlotBlockGroupByPayload<T extends SlotBlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SlotBlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SlotBlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SlotBlockGroupByOutputType[P]>
            : GetScalarType<T[P], SlotBlockGroupByOutputType[P]>
        }
      >
    >


  export type SlotBlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blockDate?: boolean
    startHour?: boolean
    endHour?: boolean
    reason?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["slotBlock"]>

  export type SlotBlockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blockDate?: boolean
    startHour?: boolean
    endHour?: boolean
    reason?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["slotBlock"]>

  export type SlotBlockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blockDate?: boolean
    startHour?: boolean
    endHour?: boolean
    reason?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["slotBlock"]>

  export type SlotBlockSelectScalar = {
    id?: boolean
    blockDate?: boolean
    startHour?: boolean
    endHour?: boolean
    reason?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SlotBlockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "blockDate" | "startHour" | "endHour" | "reason" | "note" | "createdAt" | "updatedAt", ExtArgs["result"]["slotBlock"]>

  export type $SlotBlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SlotBlock"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      blockDate: Date
      startHour: number
      endHour: number
      reason: $Enums.SlotBlockReason
      note: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["slotBlock"]>
    composites: {}
  }

  type SlotBlockGetPayload<S extends boolean | null | undefined | SlotBlockDefaultArgs> = $Result.GetResult<Prisma.$SlotBlockPayload, S>

  type SlotBlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SlotBlockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SlotBlockCountAggregateInputType | true
    }

  export interface SlotBlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SlotBlock'], meta: { name: 'SlotBlock' } }
    /**
     * Find zero or one SlotBlock that matches the filter.
     * @param {SlotBlockFindUniqueArgs} args - Arguments to find a SlotBlock
     * @example
     * // Get one SlotBlock
     * const slotBlock = await prisma.slotBlock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SlotBlockFindUniqueArgs>(args: SelectSubset<T, SlotBlockFindUniqueArgs<ExtArgs>>): Prisma__SlotBlockClient<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SlotBlock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SlotBlockFindUniqueOrThrowArgs} args - Arguments to find a SlotBlock
     * @example
     * // Get one SlotBlock
     * const slotBlock = await prisma.slotBlock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SlotBlockFindUniqueOrThrowArgs>(args: SelectSubset<T, SlotBlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SlotBlockClient<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SlotBlock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotBlockFindFirstArgs} args - Arguments to find a SlotBlock
     * @example
     * // Get one SlotBlock
     * const slotBlock = await prisma.slotBlock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SlotBlockFindFirstArgs>(args?: SelectSubset<T, SlotBlockFindFirstArgs<ExtArgs>>): Prisma__SlotBlockClient<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SlotBlock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotBlockFindFirstOrThrowArgs} args - Arguments to find a SlotBlock
     * @example
     * // Get one SlotBlock
     * const slotBlock = await prisma.slotBlock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SlotBlockFindFirstOrThrowArgs>(args?: SelectSubset<T, SlotBlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__SlotBlockClient<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SlotBlocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotBlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SlotBlocks
     * const slotBlocks = await prisma.slotBlock.findMany()
     * 
     * // Get first 10 SlotBlocks
     * const slotBlocks = await prisma.slotBlock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const slotBlockWithIdOnly = await prisma.slotBlock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SlotBlockFindManyArgs>(args?: SelectSubset<T, SlotBlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SlotBlock.
     * @param {SlotBlockCreateArgs} args - Arguments to create a SlotBlock.
     * @example
     * // Create one SlotBlock
     * const SlotBlock = await prisma.slotBlock.create({
     *   data: {
     *     // ... data to create a SlotBlock
     *   }
     * })
     * 
     */
    create<T extends SlotBlockCreateArgs>(args: SelectSubset<T, SlotBlockCreateArgs<ExtArgs>>): Prisma__SlotBlockClient<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SlotBlocks.
     * @param {SlotBlockCreateManyArgs} args - Arguments to create many SlotBlocks.
     * @example
     * // Create many SlotBlocks
     * const slotBlock = await prisma.slotBlock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SlotBlockCreateManyArgs>(args?: SelectSubset<T, SlotBlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SlotBlocks and returns the data saved in the database.
     * @param {SlotBlockCreateManyAndReturnArgs} args - Arguments to create many SlotBlocks.
     * @example
     * // Create many SlotBlocks
     * const slotBlock = await prisma.slotBlock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SlotBlocks and only return the `id`
     * const slotBlockWithIdOnly = await prisma.slotBlock.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SlotBlockCreateManyAndReturnArgs>(args?: SelectSubset<T, SlotBlockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SlotBlock.
     * @param {SlotBlockDeleteArgs} args - Arguments to delete one SlotBlock.
     * @example
     * // Delete one SlotBlock
     * const SlotBlock = await prisma.slotBlock.delete({
     *   where: {
     *     // ... filter to delete one SlotBlock
     *   }
     * })
     * 
     */
    delete<T extends SlotBlockDeleteArgs>(args: SelectSubset<T, SlotBlockDeleteArgs<ExtArgs>>): Prisma__SlotBlockClient<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SlotBlock.
     * @param {SlotBlockUpdateArgs} args - Arguments to update one SlotBlock.
     * @example
     * // Update one SlotBlock
     * const slotBlock = await prisma.slotBlock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SlotBlockUpdateArgs>(args: SelectSubset<T, SlotBlockUpdateArgs<ExtArgs>>): Prisma__SlotBlockClient<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SlotBlocks.
     * @param {SlotBlockDeleteManyArgs} args - Arguments to filter SlotBlocks to delete.
     * @example
     * // Delete a few SlotBlocks
     * const { count } = await prisma.slotBlock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SlotBlockDeleteManyArgs>(args?: SelectSubset<T, SlotBlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SlotBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotBlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SlotBlocks
     * const slotBlock = await prisma.slotBlock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SlotBlockUpdateManyArgs>(args: SelectSubset<T, SlotBlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SlotBlocks and returns the data updated in the database.
     * @param {SlotBlockUpdateManyAndReturnArgs} args - Arguments to update many SlotBlocks.
     * @example
     * // Update many SlotBlocks
     * const slotBlock = await prisma.slotBlock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SlotBlocks and only return the `id`
     * const slotBlockWithIdOnly = await prisma.slotBlock.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SlotBlockUpdateManyAndReturnArgs>(args: SelectSubset<T, SlotBlockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SlotBlock.
     * @param {SlotBlockUpsertArgs} args - Arguments to update or create a SlotBlock.
     * @example
     * // Update or create a SlotBlock
     * const slotBlock = await prisma.slotBlock.upsert({
     *   create: {
     *     // ... data to create a SlotBlock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SlotBlock we want to update
     *   }
     * })
     */
    upsert<T extends SlotBlockUpsertArgs>(args: SelectSubset<T, SlotBlockUpsertArgs<ExtArgs>>): Prisma__SlotBlockClient<$Result.GetResult<Prisma.$SlotBlockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SlotBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotBlockCountArgs} args - Arguments to filter SlotBlocks to count.
     * @example
     * // Count the number of SlotBlocks
     * const count = await prisma.slotBlock.count({
     *   where: {
     *     // ... the filter for the SlotBlocks we want to count
     *   }
     * })
    **/
    count<T extends SlotBlockCountArgs>(
      args?: Subset<T, SlotBlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SlotBlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SlotBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotBlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SlotBlockAggregateArgs>(args: Subset<T, SlotBlockAggregateArgs>): Prisma.PrismaPromise<GetSlotBlockAggregateType<T>>

    /**
     * Group by SlotBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotBlockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SlotBlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SlotBlockGroupByArgs['orderBy'] }
        : { orderBy?: SlotBlockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SlotBlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlotBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SlotBlock model
   */
  readonly fields: SlotBlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SlotBlock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SlotBlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SlotBlock model
   */
  interface SlotBlockFieldRefs {
    readonly id: FieldRef<"SlotBlock", 'String'>
    readonly blockDate: FieldRef<"SlotBlock", 'DateTime'>
    readonly startHour: FieldRef<"SlotBlock", 'Int'>
    readonly endHour: FieldRef<"SlotBlock", 'Int'>
    readonly reason: FieldRef<"SlotBlock", 'SlotBlockReason'>
    readonly note: FieldRef<"SlotBlock", 'String'>
    readonly createdAt: FieldRef<"SlotBlock", 'DateTime'>
    readonly updatedAt: FieldRef<"SlotBlock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SlotBlock findUnique
   */
  export type SlotBlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * Filter, which SlotBlock to fetch.
     */
    where: SlotBlockWhereUniqueInput
  }

  /**
   * SlotBlock findUniqueOrThrow
   */
  export type SlotBlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * Filter, which SlotBlock to fetch.
     */
    where: SlotBlockWhereUniqueInput
  }

  /**
   * SlotBlock findFirst
   */
  export type SlotBlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * Filter, which SlotBlock to fetch.
     */
    where?: SlotBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SlotBlocks to fetch.
     */
    orderBy?: SlotBlockOrderByWithRelationInput | SlotBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SlotBlocks.
     */
    cursor?: SlotBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SlotBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SlotBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SlotBlocks.
     */
    distinct?: SlotBlockScalarFieldEnum | SlotBlockScalarFieldEnum[]
  }

  /**
   * SlotBlock findFirstOrThrow
   */
  export type SlotBlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * Filter, which SlotBlock to fetch.
     */
    where?: SlotBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SlotBlocks to fetch.
     */
    orderBy?: SlotBlockOrderByWithRelationInput | SlotBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SlotBlocks.
     */
    cursor?: SlotBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SlotBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SlotBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SlotBlocks.
     */
    distinct?: SlotBlockScalarFieldEnum | SlotBlockScalarFieldEnum[]
  }

  /**
   * SlotBlock findMany
   */
  export type SlotBlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * Filter, which SlotBlocks to fetch.
     */
    where?: SlotBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SlotBlocks to fetch.
     */
    orderBy?: SlotBlockOrderByWithRelationInput | SlotBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SlotBlocks.
     */
    cursor?: SlotBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SlotBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SlotBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SlotBlocks.
     */
    distinct?: SlotBlockScalarFieldEnum | SlotBlockScalarFieldEnum[]
  }

  /**
   * SlotBlock create
   */
  export type SlotBlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * The data needed to create a SlotBlock.
     */
    data: XOR<SlotBlockCreateInput, SlotBlockUncheckedCreateInput>
  }

  /**
   * SlotBlock createMany
   */
  export type SlotBlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SlotBlocks.
     */
    data: SlotBlockCreateManyInput | SlotBlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SlotBlock createManyAndReturn
   */
  export type SlotBlockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * The data used to create many SlotBlocks.
     */
    data: SlotBlockCreateManyInput | SlotBlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SlotBlock update
   */
  export type SlotBlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * The data needed to update a SlotBlock.
     */
    data: XOR<SlotBlockUpdateInput, SlotBlockUncheckedUpdateInput>
    /**
     * Choose, which SlotBlock to update.
     */
    where: SlotBlockWhereUniqueInput
  }

  /**
   * SlotBlock updateMany
   */
  export type SlotBlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SlotBlocks.
     */
    data: XOR<SlotBlockUpdateManyMutationInput, SlotBlockUncheckedUpdateManyInput>
    /**
     * Filter which SlotBlocks to update
     */
    where?: SlotBlockWhereInput
    /**
     * Limit how many SlotBlocks to update.
     */
    limit?: number
  }

  /**
   * SlotBlock updateManyAndReturn
   */
  export type SlotBlockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * The data used to update SlotBlocks.
     */
    data: XOR<SlotBlockUpdateManyMutationInput, SlotBlockUncheckedUpdateManyInput>
    /**
     * Filter which SlotBlocks to update
     */
    where?: SlotBlockWhereInput
    /**
     * Limit how many SlotBlocks to update.
     */
    limit?: number
  }

  /**
   * SlotBlock upsert
   */
  export type SlotBlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * The filter to search for the SlotBlock to update in case it exists.
     */
    where: SlotBlockWhereUniqueInput
    /**
     * In case the SlotBlock found by the `where` argument doesn't exist, create a new SlotBlock with this data.
     */
    create: XOR<SlotBlockCreateInput, SlotBlockUncheckedCreateInput>
    /**
     * In case the SlotBlock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SlotBlockUpdateInput, SlotBlockUncheckedUpdateInput>
  }

  /**
   * SlotBlock delete
   */
  export type SlotBlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
    /**
     * Filter which SlotBlock to delete.
     */
    where: SlotBlockWhereUniqueInput
  }

  /**
   * SlotBlock deleteMany
   */
  export type SlotBlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SlotBlocks to delete
     */
    where?: SlotBlockWhereInput
    /**
     * Limit how many SlotBlocks to delete.
     */
    limit?: number
  }

  /**
   * SlotBlock without action
   */
  export type SlotBlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotBlock
     */
    select?: SlotBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SlotBlock
     */
    omit?: SlotBlockOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    bookingType: 'bookingType',
    status: 'status',
    bookingDate: 'bookingDate',
    playersCount: 'playersCount',
    totalPrice: 'totalPrice',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const BookingSlotScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    slotDate: 'slotDate',
    startHour: 'startHour',
    endHour: 'endHour',
    price: 'price',
    createdAt: 'createdAt'
  };

  export type BookingSlotScalarFieldEnum = (typeof BookingSlotScalarFieldEnum)[keyof typeof BookingSlotScalarFieldEnum]


  export const OpenGameScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    status: 'status',
    currentPlayers: 'currentPlayers',
    minPlayers: 'minPlayers',
    maxPlayers: 'maxPlayers',
    cutoffTime: 'cutoffTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OpenGameScalarFieldEnum = (typeof OpenGameScalarFieldEnum)[keyof typeof OpenGameScalarFieldEnum]


  export const OpenGameParticipantScalarFieldEnum: {
    id: 'id',
    openGameId: 'openGameId',
    userId: 'userId',
    playersJoined: 'playersJoined',
    createdAt: 'createdAt'
  };

  export type OpenGameParticipantScalarFieldEnum = (typeof OpenGameParticipantScalarFieldEnum)[keyof typeof OpenGameParticipantScalarFieldEnum]


  export const SlotBlockScalarFieldEnum: {
    id: 'id',
    blockDate: 'blockDate',
    startHour: 'startHour',
    endHour: 'endHour',
    reason: 'reason',
    note: 'note',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SlotBlockScalarFieldEnum = (typeof SlotBlockScalarFieldEnum)[keyof typeof SlotBlockScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BookingType'
   */
  export type EnumBookingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingType'>
    


  /**
   * Reference to a field of type 'BookingType[]'
   */
  export type ListEnumBookingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingType[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'OpenGameStatus'
   */
  export type EnumOpenGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OpenGameStatus'>
    


  /**
   * Reference to a field of type 'OpenGameStatus[]'
   */
  export type ListEnumOpenGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OpenGameStatus[]'>
    


  /**
   * Reference to a field of type 'SlotBlockReason'
   */
  export type EnumSlotBlockReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SlotBlockReason'>
    


  /**
   * Reference to a field of type 'SlotBlockReason[]'
   */
  export type ListEnumSlotBlockReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SlotBlockReason[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    bookings?: BookingListRelationFilter
    openGameJoins?: OpenGameParticipantListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
    openGameJoins?: OpenGameParticipantOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    bookings?: BookingListRelationFilter
    openGameJoins?: OpenGameParticipantListRelationFilter
  }, "id" | "phone" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    userId?: StringFilter<"Booking"> | string
    bookingType?: EnumBookingTypeFilter<"Booking"> | $Enums.BookingType
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    bookingDate?: DateTimeFilter<"Booking"> | Date | string
    playersCount?: IntFilter<"Booking"> | number
    totalPrice?: IntFilter<"Booking"> | number
    notes?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    slots?: BookingSlotListRelationFilter
    openGame?: XOR<OpenGameNullableScalarRelationFilter, OpenGameWhereInput> | null
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    bookingType?: SortOrder
    status?: SortOrder
    bookingDate?: SortOrder
    playersCount?: SortOrder
    totalPrice?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    slots?: BookingSlotOrderByRelationAggregateInput
    openGame?: OpenGameOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    userId?: StringFilter<"Booking"> | string
    bookingType?: EnumBookingTypeFilter<"Booking"> | $Enums.BookingType
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    bookingDate?: DateTimeFilter<"Booking"> | Date | string
    playersCount?: IntFilter<"Booking"> | number
    totalPrice?: IntFilter<"Booking"> | number
    notes?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    slots?: BookingSlotListRelationFilter
    openGame?: XOR<OpenGameNullableScalarRelationFilter, OpenGameWhereInput> | null
  }, "id">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    bookingType?: SortOrder
    status?: SortOrder
    bookingDate?: SortOrder
    playersCount?: SortOrder
    totalPrice?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    userId?: StringWithAggregatesFilter<"Booking"> | string
    bookingType?: EnumBookingTypeWithAggregatesFilter<"Booking"> | $Enums.BookingType
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    bookingDate?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    playersCount?: IntWithAggregatesFilter<"Booking"> | number
    totalPrice?: IntWithAggregatesFilter<"Booking"> | number
    notes?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type BookingSlotWhereInput = {
    AND?: BookingSlotWhereInput | BookingSlotWhereInput[]
    OR?: BookingSlotWhereInput[]
    NOT?: BookingSlotWhereInput | BookingSlotWhereInput[]
    id?: StringFilter<"BookingSlot"> | string
    bookingId?: StringFilter<"BookingSlot"> | string
    slotDate?: DateTimeFilter<"BookingSlot"> | Date | string
    startHour?: IntFilter<"BookingSlot"> | number
    endHour?: IntFilter<"BookingSlot"> | number
    price?: IntFilter<"BookingSlot"> | number
    createdAt?: DateTimeFilter<"BookingSlot"> | Date | string
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }

  export type BookingSlotOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    slotDate?: SortOrder
    startHour?: SortOrder
    endHour?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type BookingSlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookingSlotWhereInput | BookingSlotWhereInput[]
    OR?: BookingSlotWhereInput[]
    NOT?: BookingSlotWhereInput | BookingSlotWhereInput[]
    bookingId?: StringFilter<"BookingSlot"> | string
    slotDate?: DateTimeFilter<"BookingSlot"> | Date | string
    startHour?: IntFilter<"BookingSlot"> | number
    endHour?: IntFilter<"BookingSlot"> | number
    price?: IntFilter<"BookingSlot"> | number
    createdAt?: DateTimeFilter<"BookingSlot"> | Date | string
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }, "id">

  export type BookingSlotOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    slotDate?: SortOrder
    startHour?: SortOrder
    endHour?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    _count?: BookingSlotCountOrderByAggregateInput
    _avg?: BookingSlotAvgOrderByAggregateInput
    _max?: BookingSlotMaxOrderByAggregateInput
    _min?: BookingSlotMinOrderByAggregateInput
    _sum?: BookingSlotSumOrderByAggregateInput
  }

  export type BookingSlotScalarWhereWithAggregatesInput = {
    AND?: BookingSlotScalarWhereWithAggregatesInput | BookingSlotScalarWhereWithAggregatesInput[]
    OR?: BookingSlotScalarWhereWithAggregatesInput[]
    NOT?: BookingSlotScalarWhereWithAggregatesInput | BookingSlotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BookingSlot"> | string
    bookingId?: StringWithAggregatesFilter<"BookingSlot"> | string
    slotDate?: DateTimeWithAggregatesFilter<"BookingSlot"> | Date | string
    startHour?: IntWithAggregatesFilter<"BookingSlot"> | number
    endHour?: IntWithAggregatesFilter<"BookingSlot"> | number
    price?: IntWithAggregatesFilter<"BookingSlot"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BookingSlot"> | Date | string
  }

  export type OpenGameWhereInput = {
    AND?: OpenGameWhereInput | OpenGameWhereInput[]
    OR?: OpenGameWhereInput[]
    NOT?: OpenGameWhereInput | OpenGameWhereInput[]
    id?: StringFilter<"OpenGame"> | string
    bookingId?: StringFilter<"OpenGame"> | string
    status?: EnumOpenGameStatusFilter<"OpenGame"> | $Enums.OpenGameStatus
    currentPlayers?: IntFilter<"OpenGame"> | number
    minPlayers?: IntFilter<"OpenGame"> | number
    maxPlayers?: IntFilter<"OpenGame"> | number
    cutoffTime?: DateTimeFilter<"OpenGame"> | Date | string
    createdAt?: DateTimeFilter<"OpenGame"> | Date | string
    updatedAt?: DateTimeFilter<"OpenGame"> | Date | string
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
    participants?: OpenGameParticipantListRelationFilter
  }

  export type OpenGameOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    status?: SortOrder
    currentPlayers?: SortOrder
    minPlayers?: SortOrder
    maxPlayers?: SortOrder
    cutoffTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
    participants?: OpenGameParticipantOrderByRelationAggregateInput
  }

  export type OpenGameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: OpenGameWhereInput | OpenGameWhereInput[]
    OR?: OpenGameWhereInput[]
    NOT?: OpenGameWhereInput | OpenGameWhereInput[]
    status?: EnumOpenGameStatusFilter<"OpenGame"> | $Enums.OpenGameStatus
    currentPlayers?: IntFilter<"OpenGame"> | number
    minPlayers?: IntFilter<"OpenGame"> | number
    maxPlayers?: IntFilter<"OpenGame"> | number
    cutoffTime?: DateTimeFilter<"OpenGame"> | Date | string
    createdAt?: DateTimeFilter<"OpenGame"> | Date | string
    updatedAt?: DateTimeFilter<"OpenGame"> | Date | string
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
    participants?: OpenGameParticipantListRelationFilter
  }, "id" | "bookingId">

  export type OpenGameOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    status?: SortOrder
    currentPlayers?: SortOrder
    minPlayers?: SortOrder
    maxPlayers?: SortOrder
    cutoffTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OpenGameCountOrderByAggregateInput
    _avg?: OpenGameAvgOrderByAggregateInput
    _max?: OpenGameMaxOrderByAggregateInput
    _min?: OpenGameMinOrderByAggregateInput
    _sum?: OpenGameSumOrderByAggregateInput
  }

  export type OpenGameScalarWhereWithAggregatesInput = {
    AND?: OpenGameScalarWhereWithAggregatesInput | OpenGameScalarWhereWithAggregatesInput[]
    OR?: OpenGameScalarWhereWithAggregatesInput[]
    NOT?: OpenGameScalarWhereWithAggregatesInput | OpenGameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OpenGame"> | string
    bookingId?: StringWithAggregatesFilter<"OpenGame"> | string
    status?: EnumOpenGameStatusWithAggregatesFilter<"OpenGame"> | $Enums.OpenGameStatus
    currentPlayers?: IntWithAggregatesFilter<"OpenGame"> | number
    minPlayers?: IntWithAggregatesFilter<"OpenGame"> | number
    maxPlayers?: IntWithAggregatesFilter<"OpenGame"> | number
    cutoffTime?: DateTimeWithAggregatesFilter<"OpenGame"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"OpenGame"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OpenGame"> | Date | string
  }

  export type OpenGameParticipantWhereInput = {
    AND?: OpenGameParticipantWhereInput | OpenGameParticipantWhereInput[]
    OR?: OpenGameParticipantWhereInput[]
    NOT?: OpenGameParticipantWhereInput | OpenGameParticipantWhereInput[]
    id?: StringFilter<"OpenGameParticipant"> | string
    openGameId?: StringFilter<"OpenGameParticipant"> | string
    userId?: StringFilter<"OpenGameParticipant"> | string
    playersJoined?: IntFilter<"OpenGameParticipant"> | number
    createdAt?: DateTimeFilter<"OpenGameParticipant"> | Date | string
    openGame?: XOR<OpenGameScalarRelationFilter, OpenGameWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OpenGameParticipantOrderByWithRelationInput = {
    id?: SortOrder
    openGameId?: SortOrder
    userId?: SortOrder
    playersJoined?: SortOrder
    createdAt?: SortOrder
    openGame?: OpenGameOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OpenGameParticipantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OpenGameParticipantWhereInput | OpenGameParticipantWhereInput[]
    OR?: OpenGameParticipantWhereInput[]
    NOT?: OpenGameParticipantWhereInput | OpenGameParticipantWhereInput[]
    openGameId?: StringFilter<"OpenGameParticipant"> | string
    userId?: StringFilter<"OpenGameParticipant"> | string
    playersJoined?: IntFilter<"OpenGameParticipant"> | number
    createdAt?: DateTimeFilter<"OpenGameParticipant"> | Date | string
    openGame?: XOR<OpenGameScalarRelationFilter, OpenGameWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type OpenGameParticipantOrderByWithAggregationInput = {
    id?: SortOrder
    openGameId?: SortOrder
    userId?: SortOrder
    playersJoined?: SortOrder
    createdAt?: SortOrder
    _count?: OpenGameParticipantCountOrderByAggregateInput
    _avg?: OpenGameParticipantAvgOrderByAggregateInput
    _max?: OpenGameParticipantMaxOrderByAggregateInput
    _min?: OpenGameParticipantMinOrderByAggregateInput
    _sum?: OpenGameParticipantSumOrderByAggregateInput
  }

  export type OpenGameParticipantScalarWhereWithAggregatesInput = {
    AND?: OpenGameParticipantScalarWhereWithAggregatesInput | OpenGameParticipantScalarWhereWithAggregatesInput[]
    OR?: OpenGameParticipantScalarWhereWithAggregatesInput[]
    NOT?: OpenGameParticipantScalarWhereWithAggregatesInput | OpenGameParticipantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OpenGameParticipant"> | string
    openGameId?: StringWithAggregatesFilter<"OpenGameParticipant"> | string
    userId?: StringWithAggregatesFilter<"OpenGameParticipant"> | string
    playersJoined?: IntWithAggregatesFilter<"OpenGameParticipant"> | number
    createdAt?: DateTimeWithAggregatesFilter<"OpenGameParticipant"> | Date | string
  }

  export type SlotBlockWhereInput = {
    AND?: SlotBlockWhereInput | SlotBlockWhereInput[]
    OR?: SlotBlockWhereInput[]
    NOT?: SlotBlockWhereInput | SlotBlockWhereInput[]
    id?: StringFilter<"SlotBlock"> | string
    blockDate?: DateTimeFilter<"SlotBlock"> | Date | string
    startHour?: IntFilter<"SlotBlock"> | number
    endHour?: IntFilter<"SlotBlock"> | number
    reason?: EnumSlotBlockReasonFilter<"SlotBlock"> | $Enums.SlotBlockReason
    note?: StringNullableFilter<"SlotBlock"> | string | null
    createdAt?: DateTimeFilter<"SlotBlock"> | Date | string
    updatedAt?: DateTimeFilter<"SlotBlock"> | Date | string
  }

  export type SlotBlockOrderByWithRelationInput = {
    id?: SortOrder
    blockDate?: SortOrder
    startHour?: SortOrder
    endHour?: SortOrder
    reason?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SlotBlockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SlotBlockWhereInput | SlotBlockWhereInput[]
    OR?: SlotBlockWhereInput[]
    NOT?: SlotBlockWhereInput | SlotBlockWhereInput[]
    blockDate?: DateTimeFilter<"SlotBlock"> | Date | string
    startHour?: IntFilter<"SlotBlock"> | number
    endHour?: IntFilter<"SlotBlock"> | number
    reason?: EnumSlotBlockReasonFilter<"SlotBlock"> | $Enums.SlotBlockReason
    note?: StringNullableFilter<"SlotBlock"> | string | null
    createdAt?: DateTimeFilter<"SlotBlock"> | Date | string
    updatedAt?: DateTimeFilter<"SlotBlock"> | Date | string
  }, "id">

  export type SlotBlockOrderByWithAggregationInput = {
    id?: SortOrder
    blockDate?: SortOrder
    startHour?: SortOrder
    endHour?: SortOrder
    reason?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SlotBlockCountOrderByAggregateInput
    _avg?: SlotBlockAvgOrderByAggregateInput
    _max?: SlotBlockMaxOrderByAggregateInput
    _min?: SlotBlockMinOrderByAggregateInput
    _sum?: SlotBlockSumOrderByAggregateInput
  }

  export type SlotBlockScalarWhereWithAggregatesInput = {
    AND?: SlotBlockScalarWhereWithAggregatesInput | SlotBlockScalarWhereWithAggregatesInput[]
    OR?: SlotBlockScalarWhereWithAggregatesInput[]
    NOT?: SlotBlockScalarWhereWithAggregatesInput | SlotBlockScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SlotBlock"> | string
    blockDate?: DateTimeWithAggregatesFilter<"SlotBlock"> | Date | string
    startHour?: IntWithAggregatesFilter<"SlotBlock"> | number
    endHour?: IntWithAggregatesFilter<"SlotBlock"> | number
    reason?: EnumSlotBlockReasonWithAggregatesFilter<"SlotBlock"> | $Enums.SlotBlockReason
    note?: StringNullableWithAggregatesFilter<"SlotBlock"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SlotBlock"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SlotBlock"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutUserInput
    openGameJoins?: OpenGameParticipantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
    openGameJoins?: OpenGameParticipantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutUserNestedInput
    openGameJoins?: OpenGameParticipantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
    openGameJoins?: OpenGameParticipantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date | string
    playersCount: number
    totalPrice: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBookingsInput
    slots?: BookingSlotCreateNestedManyWithoutBookingInput
    openGame?: OpenGameCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    userId: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date | string
    playersCount: number
    totalPrice: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slots?: BookingSlotUncheckedCreateNestedManyWithoutBookingInput
    openGame?: OpenGameUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    slots?: BookingSlotUpdateManyWithoutBookingNestedInput
    openGame?: OpenGameUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: BookingSlotUncheckedUpdateManyWithoutBookingNestedInput
    openGame?: OpenGameUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    userId: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date | string
    playersCount: number
    totalPrice: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingSlotCreateInput = {
    id?: string
    slotDate: Date | string
    startHour: number
    endHour: number
    price: number
    createdAt?: Date | string
    booking: BookingCreateNestedOneWithoutSlotsInput
  }

  export type BookingSlotUncheckedCreateInput = {
    id?: string
    bookingId: string
    slotDate: Date | string
    startHour: number
    endHour: number
    price: number
    createdAt?: Date | string
  }

  export type BookingSlotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutSlotsNestedInput
  }

  export type BookingSlotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    slotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingSlotCreateManyInput = {
    id?: string
    bookingId: string
    slotDate: Date | string
    startHour: number
    endHour: number
    price: number
    createdAt?: Date | string
  }

  export type BookingSlotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingSlotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    slotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenGameCreateInput = {
    id?: string
    status: $Enums.OpenGameStatus
    currentPlayers: number
    minPlayers: number
    maxPlayers?: number
    cutoffTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutOpenGameInput
    participants?: OpenGameParticipantCreateNestedManyWithoutOpenGameInput
  }

  export type OpenGameUncheckedCreateInput = {
    id?: string
    bookingId: string
    status: $Enums.OpenGameStatus
    currentPlayers: number
    minPlayers: number
    maxPlayers?: number
    cutoffTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: OpenGameParticipantUncheckedCreateNestedManyWithoutOpenGameInput
  }

  export type OpenGameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOpenGameStatusFieldUpdateOperationsInput | $Enums.OpenGameStatus
    currentPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    maxPlayers?: IntFieldUpdateOperationsInput | number
    cutoffTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutOpenGameNestedInput
    participants?: OpenGameParticipantUpdateManyWithoutOpenGameNestedInput
  }

  export type OpenGameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    status?: EnumOpenGameStatusFieldUpdateOperationsInput | $Enums.OpenGameStatus
    currentPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    maxPlayers?: IntFieldUpdateOperationsInput | number
    cutoffTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: OpenGameParticipantUncheckedUpdateManyWithoutOpenGameNestedInput
  }

  export type OpenGameCreateManyInput = {
    id?: string
    bookingId: string
    status: $Enums.OpenGameStatus
    currentPlayers: number
    minPlayers: number
    maxPlayers?: number
    cutoffTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OpenGameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOpenGameStatusFieldUpdateOperationsInput | $Enums.OpenGameStatus
    currentPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    maxPlayers?: IntFieldUpdateOperationsInput | number
    cutoffTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenGameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    status?: EnumOpenGameStatusFieldUpdateOperationsInput | $Enums.OpenGameStatus
    currentPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    maxPlayers?: IntFieldUpdateOperationsInput | number
    cutoffTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenGameParticipantCreateInput = {
    id?: string
    playersJoined: number
    createdAt?: Date | string
    openGame: OpenGameCreateNestedOneWithoutParticipantsInput
    user: UserCreateNestedOneWithoutOpenGameJoinsInput
  }

  export type OpenGameParticipantUncheckedCreateInput = {
    id?: string
    openGameId: string
    userId: string
    playersJoined: number
    createdAt?: Date | string
  }

  export type OpenGameParticipantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playersJoined?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openGame?: OpenGameUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneRequiredWithoutOpenGameJoinsNestedInput
  }

  export type OpenGameParticipantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    openGameId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    playersJoined?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenGameParticipantCreateManyInput = {
    id?: string
    openGameId: string
    userId: string
    playersJoined: number
    createdAt?: Date | string
  }

  export type OpenGameParticipantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    playersJoined?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenGameParticipantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    openGameId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    playersJoined?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlotBlockCreateInput = {
    id?: string
    blockDate: Date | string
    startHour: number
    endHour: number
    reason: $Enums.SlotBlockReason
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SlotBlockUncheckedCreateInput = {
    id?: string
    blockDate: Date | string
    startHour: number
    endHour: number
    reason: $Enums.SlotBlockReason
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SlotBlockUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    reason?: EnumSlotBlockReasonFieldUpdateOperationsInput | $Enums.SlotBlockReason
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlotBlockUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    reason?: EnumSlotBlockReasonFieldUpdateOperationsInput | $Enums.SlotBlockReason
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlotBlockCreateManyInput = {
    id?: string
    blockDate: Date | string
    startHour: number
    endHour: number
    reason: $Enums.SlotBlockReason
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SlotBlockUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    reason?: EnumSlotBlockReasonFieldUpdateOperationsInput | $Enums.SlotBlockReason
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlotBlockUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    reason?: EnumSlotBlockReasonFieldUpdateOperationsInput | $Enums.SlotBlockReason
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type OpenGameParticipantListRelationFilter = {
    every?: OpenGameParticipantWhereInput
    some?: OpenGameParticipantWhereInput
    none?: OpenGameParticipantWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OpenGameParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumBookingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | EnumBookingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BookingType[] | ListEnumBookingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingType[] | ListEnumBookingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingTypeFilter<$PrismaModel> | $Enums.BookingType
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BookingSlotListRelationFilter = {
    every?: BookingSlotWhereInput
    some?: BookingSlotWhereInput
    none?: BookingSlotWhereInput
  }

  export type OpenGameNullableScalarRelationFilter = {
    is?: OpenGameWhereInput | null
    isNot?: OpenGameWhereInput | null
  }

  export type BookingSlotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bookingType?: SortOrder
    status?: SortOrder
    bookingDate?: SortOrder
    playersCount?: SortOrder
    totalPrice?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    playersCount?: SortOrder
    totalPrice?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bookingType?: SortOrder
    status?: SortOrder
    bookingDate?: SortOrder
    playersCount?: SortOrder
    totalPrice?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bookingType?: SortOrder
    status?: SortOrder
    bookingDate?: SortOrder
    playersCount?: SortOrder
    totalPrice?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    playersCount?: SortOrder
    totalPrice?: SortOrder
  }

  export type EnumBookingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | EnumBookingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BookingType[] | ListEnumBookingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingType[] | ListEnumBookingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingTypeWithAggregatesFilter<$PrismaModel> | $Enums.BookingType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingTypeFilter<$PrismaModel>
    _max?: NestedEnumBookingTypeFilter<$PrismaModel>
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BookingScalarRelationFilter = {
    is?: BookingWhereInput
    isNot?: BookingWhereInput
  }

  export type BookingSlotCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    slotDate?: SortOrder
    startHour?: SortOrder
    endHour?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
  }

  export type BookingSlotAvgOrderByAggregateInput = {
    startHour?: SortOrder
    endHour?: SortOrder
    price?: SortOrder
  }

  export type BookingSlotMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    slotDate?: SortOrder
    startHour?: SortOrder
    endHour?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
  }

  export type BookingSlotMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    slotDate?: SortOrder
    startHour?: SortOrder
    endHour?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
  }

  export type BookingSlotSumOrderByAggregateInput = {
    startHour?: SortOrder
    endHour?: SortOrder
    price?: SortOrder
  }

  export type EnumOpenGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OpenGameStatus | EnumOpenGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OpenGameStatus[] | ListEnumOpenGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OpenGameStatus[] | ListEnumOpenGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOpenGameStatusFilter<$PrismaModel> | $Enums.OpenGameStatus
  }

  export type OpenGameCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    status?: SortOrder
    currentPlayers?: SortOrder
    minPlayers?: SortOrder
    maxPlayers?: SortOrder
    cutoffTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OpenGameAvgOrderByAggregateInput = {
    currentPlayers?: SortOrder
    minPlayers?: SortOrder
    maxPlayers?: SortOrder
  }

  export type OpenGameMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    status?: SortOrder
    currentPlayers?: SortOrder
    minPlayers?: SortOrder
    maxPlayers?: SortOrder
    cutoffTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OpenGameMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    status?: SortOrder
    currentPlayers?: SortOrder
    minPlayers?: SortOrder
    maxPlayers?: SortOrder
    cutoffTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OpenGameSumOrderByAggregateInput = {
    currentPlayers?: SortOrder
    minPlayers?: SortOrder
    maxPlayers?: SortOrder
  }

  export type EnumOpenGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OpenGameStatus | EnumOpenGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OpenGameStatus[] | ListEnumOpenGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OpenGameStatus[] | ListEnumOpenGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOpenGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.OpenGameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOpenGameStatusFilter<$PrismaModel>
    _max?: NestedEnumOpenGameStatusFilter<$PrismaModel>
  }

  export type OpenGameScalarRelationFilter = {
    is?: OpenGameWhereInput
    isNot?: OpenGameWhereInput
  }

  export type OpenGameParticipantCountOrderByAggregateInput = {
    id?: SortOrder
    openGameId?: SortOrder
    userId?: SortOrder
    playersJoined?: SortOrder
    createdAt?: SortOrder
  }

  export type OpenGameParticipantAvgOrderByAggregateInput = {
    playersJoined?: SortOrder
  }

  export type OpenGameParticipantMaxOrderByAggregateInput = {
    id?: SortOrder
    openGameId?: SortOrder
    userId?: SortOrder
    playersJoined?: SortOrder
    createdAt?: SortOrder
  }

  export type OpenGameParticipantMinOrderByAggregateInput = {
    id?: SortOrder
    openGameId?: SortOrder
    userId?: SortOrder
    playersJoined?: SortOrder
    createdAt?: SortOrder
  }

  export type OpenGameParticipantSumOrderByAggregateInput = {
    playersJoined?: SortOrder
  }

  export type EnumSlotBlockReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.SlotBlockReason | EnumSlotBlockReasonFieldRefInput<$PrismaModel>
    in?: $Enums.SlotBlockReason[] | ListEnumSlotBlockReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.SlotBlockReason[] | ListEnumSlotBlockReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumSlotBlockReasonFilter<$PrismaModel> | $Enums.SlotBlockReason
  }

  export type SlotBlockCountOrderByAggregateInput = {
    id?: SortOrder
    blockDate?: SortOrder
    startHour?: SortOrder
    endHour?: SortOrder
    reason?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SlotBlockAvgOrderByAggregateInput = {
    startHour?: SortOrder
    endHour?: SortOrder
  }

  export type SlotBlockMaxOrderByAggregateInput = {
    id?: SortOrder
    blockDate?: SortOrder
    startHour?: SortOrder
    endHour?: SortOrder
    reason?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SlotBlockMinOrderByAggregateInput = {
    id?: SortOrder
    blockDate?: SortOrder
    startHour?: SortOrder
    endHour?: SortOrder
    reason?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SlotBlockSumOrderByAggregateInput = {
    startHour?: SortOrder
    endHour?: SortOrder
  }

  export type EnumSlotBlockReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SlotBlockReason | EnumSlotBlockReasonFieldRefInput<$PrismaModel>
    in?: $Enums.SlotBlockReason[] | ListEnumSlotBlockReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.SlotBlockReason[] | ListEnumSlotBlockReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumSlotBlockReasonWithAggregatesFilter<$PrismaModel> | $Enums.SlotBlockReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSlotBlockReasonFilter<$PrismaModel>
    _max?: NestedEnumSlotBlockReasonFilter<$PrismaModel>
  }

  export type BookingCreateNestedManyWithoutUserInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type OpenGameParticipantCreateNestedManyWithoutUserInput = {
    create?: XOR<OpenGameParticipantCreateWithoutUserInput, OpenGameParticipantUncheckedCreateWithoutUserInput> | OpenGameParticipantCreateWithoutUserInput[] | OpenGameParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OpenGameParticipantCreateOrConnectWithoutUserInput | OpenGameParticipantCreateOrConnectWithoutUserInput[]
    createMany?: OpenGameParticipantCreateManyUserInputEnvelope
    connect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type OpenGameParticipantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OpenGameParticipantCreateWithoutUserInput, OpenGameParticipantUncheckedCreateWithoutUserInput> | OpenGameParticipantCreateWithoutUserInput[] | OpenGameParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OpenGameParticipantCreateOrConnectWithoutUserInput | OpenGameParticipantCreateOrConnectWithoutUserInput[]
    createMany?: OpenGameParticipantCreateManyUserInputEnvelope
    connect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BookingUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUserInput | BookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUserInput | BookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUserInput | BookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type OpenGameParticipantUpdateManyWithoutUserNestedInput = {
    create?: XOR<OpenGameParticipantCreateWithoutUserInput, OpenGameParticipantUncheckedCreateWithoutUserInput> | OpenGameParticipantCreateWithoutUserInput[] | OpenGameParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OpenGameParticipantCreateOrConnectWithoutUserInput | OpenGameParticipantCreateOrConnectWithoutUserInput[]
    upsert?: OpenGameParticipantUpsertWithWhereUniqueWithoutUserInput | OpenGameParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OpenGameParticipantCreateManyUserInputEnvelope
    set?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    disconnect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    delete?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    connect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    update?: OpenGameParticipantUpdateWithWhereUniqueWithoutUserInput | OpenGameParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OpenGameParticipantUpdateManyWithWhereWithoutUserInput | OpenGameParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OpenGameParticipantScalarWhereInput | OpenGameParticipantScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUserInput | BookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUserInput | BookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUserInput | BookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type OpenGameParticipantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OpenGameParticipantCreateWithoutUserInput, OpenGameParticipantUncheckedCreateWithoutUserInput> | OpenGameParticipantCreateWithoutUserInput[] | OpenGameParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OpenGameParticipantCreateOrConnectWithoutUserInput | OpenGameParticipantCreateOrConnectWithoutUserInput[]
    upsert?: OpenGameParticipantUpsertWithWhereUniqueWithoutUserInput | OpenGameParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OpenGameParticipantCreateManyUserInputEnvelope
    set?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    disconnect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    delete?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    connect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    update?: OpenGameParticipantUpdateWithWhereUniqueWithoutUserInput | OpenGameParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OpenGameParticipantUpdateManyWithWhereWithoutUserInput | OpenGameParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OpenGameParticipantScalarWhereInput | OpenGameParticipantScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type BookingSlotCreateNestedManyWithoutBookingInput = {
    create?: XOR<BookingSlotCreateWithoutBookingInput, BookingSlotUncheckedCreateWithoutBookingInput> | BookingSlotCreateWithoutBookingInput[] | BookingSlotUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookingSlotCreateOrConnectWithoutBookingInput | BookingSlotCreateOrConnectWithoutBookingInput[]
    createMany?: BookingSlotCreateManyBookingInputEnvelope
    connect?: BookingSlotWhereUniqueInput | BookingSlotWhereUniqueInput[]
  }

  export type OpenGameCreateNestedOneWithoutBookingInput = {
    create?: XOR<OpenGameCreateWithoutBookingInput, OpenGameUncheckedCreateWithoutBookingInput>
    connectOrCreate?: OpenGameCreateOrConnectWithoutBookingInput
    connect?: OpenGameWhereUniqueInput
  }

  export type BookingSlotUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<BookingSlotCreateWithoutBookingInput, BookingSlotUncheckedCreateWithoutBookingInput> | BookingSlotCreateWithoutBookingInput[] | BookingSlotUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookingSlotCreateOrConnectWithoutBookingInput | BookingSlotCreateOrConnectWithoutBookingInput[]
    createMany?: BookingSlotCreateManyBookingInputEnvelope
    connect?: BookingSlotWhereUniqueInput | BookingSlotWhereUniqueInput[]
  }

  export type OpenGameUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<OpenGameCreateWithoutBookingInput, OpenGameUncheckedCreateWithoutBookingInput>
    connectOrCreate?: OpenGameCreateOrConnectWithoutBookingInput
    connect?: OpenGameWhereUniqueInput
  }

  export type EnumBookingTypeFieldUpdateOperationsInput = {
    set?: $Enums.BookingType
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    upsert?: UserUpsertWithoutBookingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookingsInput, UserUpdateWithoutBookingsInput>, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type BookingSlotUpdateManyWithoutBookingNestedInput = {
    create?: XOR<BookingSlotCreateWithoutBookingInput, BookingSlotUncheckedCreateWithoutBookingInput> | BookingSlotCreateWithoutBookingInput[] | BookingSlotUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookingSlotCreateOrConnectWithoutBookingInput | BookingSlotCreateOrConnectWithoutBookingInput[]
    upsert?: BookingSlotUpsertWithWhereUniqueWithoutBookingInput | BookingSlotUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: BookingSlotCreateManyBookingInputEnvelope
    set?: BookingSlotWhereUniqueInput | BookingSlotWhereUniqueInput[]
    disconnect?: BookingSlotWhereUniqueInput | BookingSlotWhereUniqueInput[]
    delete?: BookingSlotWhereUniqueInput | BookingSlotWhereUniqueInput[]
    connect?: BookingSlotWhereUniqueInput | BookingSlotWhereUniqueInput[]
    update?: BookingSlotUpdateWithWhereUniqueWithoutBookingInput | BookingSlotUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: BookingSlotUpdateManyWithWhereWithoutBookingInput | BookingSlotUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: BookingSlotScalarWhereInput | BookingSlotScalarWhereInput[]
  }

  export type OpenGameUpdateOneWithoutBookingNestedInput = {
    create?: XOR<OpenGameCreateWithoutBookingInput, OpenGameUncheckedCreateWithoutBookingInput>
    connectOrCreate?: OpenGameCreateOrConnectWithoutBookingInput
    upsert?: OpenGameUpsertWithoutBookingInput
    disconnect?: OpenGameWhereInput | boolean
    delete?: OpenGameWhereInput | boolean
    connect?: OpenGameWhereUniqueInput
    update?: XOR<XOR<OpenGameUpdateToOneWithWhereWithoutBookingInput, OpenGameUpdateWithoutBookingInput>, OpenGameUncheckedUpdateWithoutBookingInput>
  }

  export type BookingSlotUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<BookingSlotCreateWithoutBookingInput, BookingSlotUncheckedCreateWithoutBookingInput> | BookingSlotCreateWithoutBookingInput[] | BookingSlotUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookingSlotCreateOrConnectWithoutBookingInput | BookingSlotCreateOrConnectWithoutBookingInput[]
    upsert?: BookingSlotUpsertWithWhereUniqueWithoutBookingInput | BookingSlotUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: BookingSlotCreateManyBookingInputEnvelope
    set?: BookingSlotWhereUniqueInput | BookingSlotWhereUniqueInput[]
    disconnect?: BookingSlotWhereUniqueInput | BookingSlotWhereUniqueInput[]
    delete?: BookingSlotWhereUniqueInput | BookingSlotWhereUniqueInput[]
    connect?: BookingSlotWhereUniqueInput | BookingSlotWhereUniqueInput[]
    update?: BookingSlotUpdateWithWhereUniqueWithoutBookingInput | BookingSlotUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: BookingSlotUpdateManyWithWhereWithoutBookingInput | BookingSlotUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: BookingSlotScalarWhereInput | BookingSlotScalarWhereInput[]
  }

  export type OpenGameUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<OpenGameCreateWithoutBookingInput, OpenGameUncheckedCreateWithoutBookingInput>
    connectOrCreate?: OpenGameCreateOrConnectWithoutBookingInput
    upsert?: OpenGameUpsertWithoutBookingInput
    disconnect?: OpenGameWhereInput | boolean
    delete?: OpenGameWhereInput | boolean
    connect?: OpenGameWhereUniqueInput
    update?: XOR<XOR<OpenGameUpdateToOneWithWhereWithoutBookingInput, OpenGameUpdateWithoutBookingInput>, OpenGameUncheckedUpdateWithoutBookingInput>
  }

  export type BookingCreateNestedOneWithoutSlotsInput = {
    create?: XOR<BookingCreateWithoutSlotsInput, BookingUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutSlotsInput
    connect?: BookingWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutSlotsNestedInput = {
    create?: XOR<BookingCreateWithoutSlotsInput, BookingUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutSlotsInput
    upsert?: BookingUpsertWithoutSlotsInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutSlotsInput, BookingUpdateWithoutSlotsInput>, BookingUncheckedUpdateWithoutSlotsInput>
  }

  export type BookingCreateNestedOneWithoutOpenGameInput = {
    create?: XOR<BookingCreateWithoutOpenGameInput, BookingUncheckedCreateWithoutOpenGameInput>
    connectOrCreate?: BookingCreateOrConnectWithoutOpenGameInput
    connect?: BookingWhereUniqueInput
  }

  export type OpenGameParticipantCreateNestedManyWithoutOpenGameInput = {
    create?: XOR<OpenGameParticipantCreateWithoutOpenGameInput, OpenGameParticipantUncheckedCreateWithoutOpenGameInput> | OpenGameParticipantCreateWithoutOpenGameInput[] | OpenGameParticipantUncheckedCreateWithoutOpenGameInput[]
    connectOrCreate?: OpenGameParticipantCreateOrConnectWithoutOpenGameInput | OpenGameParticipantCreateOrConnectWithoutOpenGameInput[]
    createMany?: OpenGameParticipantCreateManyOpenGameInputEnvelope
    connect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
  }

  export type OpenGameParticipantUncheckedCreateNestedManyWithoutOpenGameInput = {
    create?: XOR<OpenGameParticipantCreateWithoutOpenGameInput, OpenGameParticipantUncheckedCreateWithoutOpenGameInput> | OpenGameParticipantCreateWithoutOpenGameInput[] | OpenGameParticipantUncheckedCreateWithoutOpenGameInput[]
    connectOrCreate?: OpenGameParticipantCreateOrConnectWithoutOpenGameInput | OpenGameParticipantCreateOrConnectWithoutOpenGameInput[]
    createMany?: OpenGameParticipantCreateManyOpenGameInputEnvelope
    connect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
  }

  export type EnumOpenGameStatusFieldUpdateOperationsInput = {
    set?: $Enums.OpenGameStatus
  }

  export type BookingUpdateOneRequiredWithoutOpenGameNestedInput = {
    create?: XOR<BookingCreateWithoutOpenGameInput, BookingUncheckedCreateWithoutOpenGameInput>
    connectOrCreate?: BookingCreateOrConnectWithoutOpenGameInput
    upsert?: BookingUpsertWithoutOpenGameInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutOpenGameInput, BookingUpdateWithoutOpenGameInput>, BookingUncheckedUpdateWithoutOpenGameInput>
  }

  export type OpenGameParticipantUpdateManyWithoutOpenGameNestedInput = {
    create?: XOR<OpenGameParticipantCreateWithoutOpenGameInput, OpenGameParticipantUncheckedCreateWithoutOpenGameInput> | OpenGameParticipantCreateWithoutOpenGameInput[] | OpenGameParticipantUncheckedCreateWithoutOpenGameInput[]
    connectOrCreate?: OpenGameParticipantCreateOrConnectWithoutOpenGameInput | OpenGameParticipantCreateOrConnectWithoutOpenGameInput[]
    upsert?: OpenGameParticipantUpsertWithWhereUniqueWithoutOpenGameInput | OpenGameParticipantUpsertWithWhereUniqueWithoutOpenGameInput[]
    createMany?: OpenGameParticipantCreateManyOpenGameInputEnvelope
    set?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    disconnect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    delete?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    connect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    update?: OpenGameParticipantUpdateWithWhereUniqueWithoutOpenGameInput | OpenGameParticipantUpdateWithWhereUniqueWithoutOpenGameInput[]
    updateMany?: OpenGameParticipantUpdateManyWithWhereWithoutOpenGameInput | OpenGameParticipantUpdateManyWithWhereWithoutOpenGameInput[]
    deleteMany?: OpenGameParticipantScalarWhereInput | OpenGameParticipantScalarWhereInput[]
  }

  export type OpenGameParticipantUncheckedUpdateManyWithoutOpenGameNestedInput = {
    create?: XOR<OpenGameParticipantCreateWithoutOpenGameInput, OpenGameParticipantUncheckedCreateWithoutOpenGameInput> | OpenGameParticipantCreateWithoutOpenGameInput[] | OpenGameParticipantUncheckedCreateWithoutOpenGameInput[]
    connectOrCreate?: OpenGameParticipantCreateOrConnectWithoutOpenGameInput | OpenGameParticipantCreateOrConnectWithoutOpenGameInput[]
    upsert?: OpenGameParticipantUpsertWithWhereUniqueWithoutOpenGameInput | OpenGameParticipantUpsertWithWhereUniqueWithoutOpenGameInput[]
    createMany?: OpenGameParticipantCreateManyOpenGameInputEnvelope
    set?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    disconnect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    delete?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    connect?: OpenGameParticipantWhereUniqueInput | OpenGameParticipantWhereUniqueInput[]
    update?: OpenGameParticipantUpdateWithWhereUniqueWithoutOpenGameInput | OpenGameParticipantUpdateWithWhereUniqueWithoutOpenGameInput[]
    updateMany?: OpenGameParticipantUpdateManyWithWhereWithoutOpenGameInput | OpenGameParticipantUpdateManyWithWhereWithoutOpenGameInput[]
    deleteMany?: OpenGameParticipantScalarWhereInput | OpenGameParticipantScalarWhereInput[]
  }

  export type OpenGameCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<OpenGameCreateWithoutParticipantsInput, OpenGameUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: OpenGameCreateOrConnectWithoutParticipantsInput
    connect?: OpenGameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOpenGameJoinsInput = {
    create?: XOR<UserCreateWithoutOpenGameJoinsInput, UserUncheckedCreateWithoutOpenGameJoinsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOpenGameJoinsInput
    connect?: UserWhereUniqueInput
  }

  export type OpenGameUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<OpenGameCreateWithoutParticipantsInput, OpenGameUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: OpenGameCreateOrConnectWithoutParticipantsInput
    upsert?: OpenGameUpsertWithoutParticipantsInput
    connect?: OpenGameWhereUniqueInput
    update?: XOR<XOR<OpenGameUpdateToOneWithWhereWithoutParticipantsInput, OpenGameUpdateWithoutParticipantsInput>, OpenGameUncheckedUpdateWithoutParticipantsInput>
  }

  export type UserUpdateOneRequiredWithoutOpenGameJoinsNestedInput = {
    create?: XOR<UserCreateWithoutOpenGameJoinsInput, UserUncheckedCreateWithoutOpenGameJoinsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOpenGameJoinsInput
    upsert?: UserUpsertWithoutOpenGameJoinsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOpenGameJoinsInput, UserUpdateWithoutOpenGameJoinsInput>, UserUncheckedUpdateWithoutOpenGameJoinsInput>
  }

  export type EnumSlotBlockReasonFieldUpdateOperationsInput = {
    set?: $Enums.SlotBlockReason
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumBookingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | EnumBookingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BookingType[] | ListEnumBookingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingType[] | ListEnumBookingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingTypeFilter<$PrismaModel> | $Enums.BookingType
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumBookingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | EnumBookingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BookingType[] | ListEnumBookingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingType[] | ListEnumBookingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingTypeWithAggregatesFilter<$PrismaModel> | $Enums.BookingType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingTypeFilter<$PrismaModel>
    _max?: NestedEnumBookingTypeFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumOpenGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OpenGameStatus | EnumOpenGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OpenGameStatus[] | ListEnumOpenGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OpenGameStatus[] | ListEnumOpenGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOpenGameStatusFilter<$PrismaModel> | $Enums.OpenGameStatus
  }

  export type NestedEnumOpenGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OpenGameStatus | EnumOpenGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OpenGameStatus[] | ListEnumOpenGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OpenGameStatus[] | ListEnumOpenGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOpenGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.OpenGameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOpenGameStatusFilter<$PrismaModel>
    _max?: NestedEnumOpenGameStatusFilter<$PrismaModel>
  }

  export type NestedEnumSlotBlockReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.SlotBlockReason | EnumSlotBlockReasonFieldRefInput<$PrismaModel>
    in?: $Enums.SlotBlockReason[] | ListEnumSlotBlockReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.SlotBlockReason[] | ListEnumSlotBlockReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumSlotBlockReasonFilter<$PrismaModel> | $Enums.SlotBlockReason
  }

  export type NestedEnumSlotBlockReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SlotBlockReason | EnumSlotBlockReasonFieldRefInput<$PrismaModel>
    in?: $Enums.SlotBlockReason[] | ListEnumSlotBlockReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.SlotBlockReason[] | ListEnumSlotBlockReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumSlotBlockReasonWithAggregatesFilter<$PrismaModel> | $Enums.SlotBlockReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSlotBlockReasonFilter<$PrismaModel>
    _max?: NestedEnumSlotBlockReasonFilter<$PrismaModel>
  }

  export type BookingCreateWithoutUserInput = {
    id?: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date | string
    playersCount: number
    totalPrice: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slots?: BookingSlotCreateNestedManyWithoutBookingInput
    openGame?: OpenGameCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutUserInput = {
    id?: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date | string
    playersCount: number
    totalPrice: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slots?: BookingSlotUncheckedCreateNestedManyWithoutBookingInput
    openGame?: OpenGameUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutUserInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingCreateManyUserInputEnvelope = {
    data: BookingCreateManyUserInput | BookingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OpenGameParticipantCreateWithoutUserInput = {
    id?: string
    playersJoined: number
    createdAt?: Date | string
    openGame: OpenGameCreateNestedOneWithoutParticipantsInput
  }

  export type OpenGameParticipantUncheckedCreateWithoutUserInput = {
    id?: string
    openGameId: string
    playersJoined: number
    createdAt?: Date | string
  }

  export type OpenGameParticipantCreateOrConnectWithoutUserInput = {
    where: OpenGameParticipantWhereUniqueInput
    create: XOR<OpenGameParticipantCreateWithoutUserInput, OpenGameParticipantUncheckedCreateWithoutUserInput>
  }

  export type OpenGameParticipantCreateManyUserInputEnvelope = {
    data: OpenGameParticipantCreateManyUserInput | OpenGameParticipantCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
  }

  export type BookingUpdateManyWithWhereWithoutUserInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutUserInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    userId?: StringFilter<"Booking"> | string
    bookingType?: EnumBookingTypeFilter<"Booking"> | $Enums.BookingType
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    bookingDate?: DateTimeFilter<"Booking"> | Date | string
    playersCount?: IntFilter<"Booking"> | number
    totalPrice?: IntFilter<"Booking"> | number
    notes?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type OpenGameParticipantUpsertWithWhereUniqueWithoutUserInput = {
    where: OpenGameParticipantWhereUniqueInput
    update: XOR<OpenGameParticipantUpdateWithoutUserInput, OpenGameParticipantUncheckedUpdateWithoutUserInput>
    create: XOR<OpenGameParticipantCreateWithoutUserInput, OpenGameParticipantUncheckedCreateWithoutUserInput>
  }

  export type OpenGameParticipantUpdateWithWhereUniqueWithoutUserInput = {
    where: OpenGameParticipantWhereUniqueInput
    data: XOR<OpenGameParticipantUpdateWithoutUserInput, OpenGameParticipantUncheckedUpdateWithoutUserInput>
  }

  export type OpenGameParticipantUpdateManyWithWhereWithoutUserInput = {
    where: OpenGameParticipantScalarWhereInput
    data: XOR<OpenGameParticipantUpdateManyMutationInput, OpenGameParticipantUncheckedUpdateManyWithoutUserInput>
  }

  export type OpenGameParticipantScalarWhereInput = {
    AND?: OpenGameParticipantScalarWhereInput | OpenGameParticipantScalarWhereInput[]
    OR?: OpenGameParticipantScalarWhereInput[]
    NOT?: OpenGameParticipantScalarWhereInput | OpenGameParticipantScalarWhereInput[]
    id?: StringFilter<"OpenGameParticipant"> | string
    openGameId?: StringFilter<"OpenGameParticipant"> | string
    userId?: StringFilter<"OpenGameParticipant"> | string
    playersJoined?: IntFilter<"OpenGameParticipant"> | number
    createdAt?: DateTimeFilter<"OpenGameParticipant"> | Date | string
  }

  export type UserCreateWithoutBookingsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    openGameJoins?: OpenGameParticipantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookingsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    openGameJoins?: OpenGameParticipantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
  }

  export type BookingSlotCreateWithoutBookingInput = {
    id?: string
    slotDate: Date | string
    startHour: number
    endHour: number
    price: number
    createdAt?: Date | string
  }

  export type BookingSlotUncheckedCreateWithoutBookingInput = {
    id?: string
    slotDate: Date | string
    startHour: number
    endHour: number
    price: number
    createdAt?: Date | string
  }

  export type BookingSlotCreateOrConnectWithoutBookingInput = {
    where: BookingSlotWhereUniqueInput
    create: XOR<BookingSlotCreateWithoutBookingInput, BookingSlotUncheckedCreateWithoutBookingInput>
  }

  export type BookingSlotCreateManyBookingInputEnvelope = {
    data: BookingSlotCreateManyBookingInput | BookingSlotCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type OpenGameCreateWithoutBookingInput = {
    id?: string
    status: $Enums.OpenGameStatus
    currentPlayers: number
    minPlayers: number
    maxPlayers?: number
    cutoffTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: OpenGameParticipantCreateNestedManyWithoutOpenGameInput
  }

  export type OpenGameUncheckedCreateWithoutBookingInput = {
    id?: string
    status: $Enums.OpenGameStatus
    currentPlayers: number
    minPlayers: number
    maxPlayers?: number
    cutoffTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: OpenGameParticipantUncheckedCreateNestedManyWithoutOpenGameInput
  }

  export type OpenGameCreateOrConnectWithoutBookingInput = {
    where: OpenGameWhereUniqueInput
    create: XOR<OpenGameCreateWithoutBookingInput, OpenGameUncheckedCreateWithoutBookingInput>
  }

  export type UserUpsertWithoutBookingsInput = {
    update: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type UserUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openGameJoins?: OpenGameParticipantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openGameJoins?: OpenGameParticipantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookingSlotUpsertWithWhereUniqueWithoutBookingInput = {
    where: BookingSlotWhereUniqueInput
    update: XOR<BookingSlotUpdateWithoutBookingInput, BookingSlotUncheckedUpdateWithoutBookingInput>
    create: XOR<BookingSlotCreateWithoutBookingInput, BookingSlotUncheckedCreateWithoutBookingInput>
  }

  export type BookingSlotUpdateWithWhereUniqueWithoutBookingInput = {
    where: BookingSlotWhereUniqueInput
    data: XOR<BookingSlotUpdateWithoutBookingInput, BookingSlotUncheckedUpdateWithoutBookingInput>
  }

  export type BookingSlotUpdateManyWithWhereWithoutBookingInput = {
    where: BookingSlotScalarWhereInput
    data: XOR<BookingSlotUpdateManyMutationInput, BookingSlotUncheckedUpdateManyWithoutBookingInput>
  }

  export type BookingSlotScalarWhereInput = {
    AND?: BookingSlotScalarWhereInput | BookingSlotScalarWhereInput[]
    OR?: BookingSlotScalarWhereInput[]
    NOT?: BookingSlotScalarWhereInput | BookingSlotScalarWhereInput[]
    id?: StringFilter<"BookingSlot"> | string
    bookingId?: StringFilter<"BookingSlot"> | string
    slotDate?: DateTimeFilter<"BookingSlot"> | Date | string
    startHour?: IntFilter<"BookingSlot"> | number
    endHour?: IntFilter<"BookingSlot"> | number
    price?: IntFilter<"BookingSlot"> | number
    createdAt?: DateTimeFilter<"BookingSlot"> | Date | string
  }

  export type OpenGameUpsertWithoutBookingInput = {
    update: XOR<OpenGameUpdateWithoutBookingInput, OpenGameUncheckedUpdateWithoutBookingInput>
    create: XOR<OpenGameCreateWithoutBookingInput, OpenGameUncheckedCreateWithoutBookingInput>
    where?: OpenGameWhereInput
  }

  export type OpenGameUpdateToOneWithWhereWithoutBookingInput = {
    where?: OpenGameWhereInput
    data: XOR<OpenGameUpdateWithoutBookingInput, OpenGameUncheckedUpdateWithoutBookingInput>
  }

  export type OpenGameUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOpenGameStatusFieldUpdateOperationsInput | $Enums.OpenGameStatus
    currentPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    maxPlayers?: IntFieldUpdateOperationsInput | number
    cutoffTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: OpenGameParticipantUpdateManyWithoutOpenGameNestedInput
  }

  export type OpenGameUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOpenGameStatusFieldUpdateOperationsInput | $Enums.OpenGameStatus
    currentPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    maxPlayers?: IntFieldUpdateOperationsInput | number
    cutoffTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: OpenGameParticipantUncheckedUpdateManyWithoutOpenGameNestedInput
  }

  export type BookingCreateWithoutSlotsInput = {
    id?: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date | string
    playersCount: number
    totalPrice: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBookingsInput
    openGame?: OpenGameCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutSlotsInput = {
    id?: string
    userId: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date | string
    playersCount: number
    totalPrice: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    openGame?: OpenGameUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutSlotsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutSlotsInput, BookingUncheckedCreateWithoutSlotsInput>
  }

  export type BookingUpsertWithoutSlotsInput = {
    update: XOR<BookingUpdateWithoutSlotsInput, BookingUncheckedUpdateWithoutSlotsInput>
    create: XOR<BookingCreateWithoutSlotsInput, BookingUncheckedCreateWithoutSlotsInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutSlotsInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutSlotsInput, BookingUncheckedUpdateWithoutSlotsInput>
  }

  export type BookingUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    openGame?: OpenGameUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openGame?: OpenGameUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateWithoutOpenGameInput = {
    id?: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date | string
    playersCount: number
    totalPrice: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBookingsInput
    slots?: BookingSlotCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutOpenGameInput = {
    id?: string
    userId: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date | string
    playersCount: number
    totalPrice: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slots?: BookingSlotUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutOpenGameInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutOpenGameInput, BookingUncheckedCreateWithoutOpenGameInput>
  }

  export type OpenGameParticipantCreateWithoutOpenGameInput = {
    id?: string
    playersJoined: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutOpenGameJoinsInput
  }

  export type OpenGameParticipantUncheckedCreateWithoutOpenGameInput = {
    id?: string
    userId: string
    playersJoined: number
    createdAt?: Date | string
  }

  export type OpenGameParticipantCreateOrConnectWithoutOpenGameInput = {
    where: OpenGameParticipantWhereUniqueInput
    create: XOR<OpenGameParticipantCreateWithoutOpenGameInput, OpenGameParticipantUncheckedCreateWithoutOpenGameInput>
  }

  export type OpenGameParticipantCreateManyOpenGameInputEnvelope = {
    data: OpenGameParticipantCreateManyOpenGameInput | OpenGameParticipantCreateManyOpenGameInput[]
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithoutOpenGameInput = {
    update: XOR<BookingUpdateWithoutOpenGameInput, BookingUncheckedUpdateWithoutOpenGameInput>
    create: XOR<BookingCreateWithoutOpenGameInput, BookingUncheckedCreateWithoutOpenGameInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutOpenGameInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutOpenGameInput, BookingUncheckedUpdateWithoutOpenGameInput>
  }

  export type BookingUpdateWithoutOpenGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    slots?: BookingSlotUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutOpenGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: BookingSlotUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type OpenGameParticipantUpsertWithWhereUniqueWithoutOpenGameInput = {
    where: OpenGameParticipantWhereUniqueInput
    update: XOR<OpenGameParticipantUpdateWithoutOpenGameInput, OpenGameParticipantUncheckedUpdateWithoutOpenGameInput>
    create: XOR<OpenGameParticipantCreateWithoutOpenGameInput, OpenGameParticipantUncheckedCreateWithoutOpenGameInput>
  }

  export type OpenGameParticipantUpdateWithWhereUniqueWithoutOpenGameInput = {
    where: OpenGameParticipantWhereUniqueInput
    data: XOR<OpenGameParticipantUpdateWithoutOpenGameInput, OpenGameParticipantUncheckedUpdateWithoutOpenGameInput>
  }

  export type OpenGameParticipantUpdateManyWithWhereWithoutOpenGameInput = {
    where: OpenGameParticipantScalarWhereInput
    data: XOR<OpenGameParticipantUpdateManyMutationInput, OpenGameParticipantUncheckedUpdateManyWithoutOpenGameInput>
  }

  export type OpenGameCreateWithoutParticipantsInput = {
    id?: string
    status: $Enums.OpenGameStatus
    currentPlayers: number
    minPlayers: number
    maxPlayers?: number
    cutoffTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutOpenGameInput
  }

  export type OpenGameUncheckedCreateWithoutParticipantsInput = {
    id?: string
    bookingId: string
    status: $Enums.OpenGameStatus
    currentPlayers: number
    minPlayers: number
    maxPlayers?: number
    cutoffTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OpenGameCreateOrConnectWithoutParticipantsInput = {
    where: OpenGameWhereUniqueInput
    create: XOR<OpenGameCreateWithoutParticipantsInput, OpenGameUncheckedCreateWithoutParticipantsInput>
  }

  export type UserCreateWithoutOpenGameJoinsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOpenGameJoinsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOpenGameJoinsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOpenGameJoinsInput, UserUncheckedCreateWithoutOpenGameJoinsInput>
  }

  export type OpenGameUpsertWithoutParticipantsInput = {
    update: XOR<OpenGameUpdateWithoutParticipantsInput, OpenGameUncheckedUpdateWithoutParticipantsInput>
    create: XOR<OpenGameCreateWithoutParticipantsInput, OpenGameUncheckedCreateWithoutParticipantsInput>
    where?: OpenGameWhereInput
  }

  export type OpenGameUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: OpenGameWhereInput
    data: XOR<OpenGameUpdateWithoutParticipantsInput, OpenGameUncheckedUpdateWithoutParticipantsInput>
  }

  export type OpenGameUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOpenGameStatusFieldUpdateOperationsInput | $Enums.OpenGameStatus
    currentPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    maxPlayers?: IntFieldUpdateOperationsInput | number
    cutoffTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutOpenGameNestedInput
  }

  export type OpenGameUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    status?: EnumOpenGameStatusFieldUpdateOperationsInput | $Enums.OpenGameStatus
    currentPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    maxPlayers?: IntFieldUpdateOperationsInput | number
    cutoffTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutOpenGameJoinsInput = {
    update: XOR<UserUpdateWithoutOpenGameJoinsInput, UserUncheckedUpdateWithoutOpenGameJoinsInput>
    create: XOR<UserCreateWithoutOpenGameJoinsInput, UserUncheckedCreateWithoutOpenGameJoinsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOpenGameJoinsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOpenGameJoinsInput, UserUncheckedUpdateWithoutOpenGameJoinsInput>
  }

  export type UserUpdateWithoutOpenGameJoinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOpenGameJoinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookingCreateManyUserInput = {
    id?: string
    bookingType: $Enums.BookingType
    status: $Enums.BookingStatus
    bookingDate: Date | string
    playersCount: number
    totalPrice: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OpenGameParticipantCreateManyUserInput = {
    id?: string
    openGameId: string
    playersJoined: number
    createdAt?: Date | string
  }

  export type BookingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: BookingSlotUpdateManyWithoutBookingNestedInput
    openGame?: OpenGameUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: BookingSlotUncheckedUpdateManyWithoutBookingNestedInput
    openGame?: OpenGameUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingType?: EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    playersCount?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenGameParticipantUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    playersJoined?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openGame?: OpenGameUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type OpenGameParticipantUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    openGameId?: StringFieldUpdateOperationsInput | string
    playersJoined?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenGameParticipantUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    openGameId?: StringFieldUpdateOperationsInput | string
    playersJoined?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingSlotCreateManyBookingInput = {
    id?: string
    slotDate: Date | string
    startHour: number
    endHour: number
    price: number
    createdAt?: Date | string
  }

  export type BookingSlotUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    slotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingSlotUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    slotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingSlotUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    slotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startHour?: IntFieldUpdateOperationsInput | number
    endHour?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenGameParticipantCreateManyOpenGameInput = {
    id?: string
    userId: string
    playersJoined: number
    createdAt?: Date | string
  }

  export type OpenGameParticipantUpdateWithoutOpenGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    playersJoined?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOpenGameJoinsNestedInput
  }

  export type OpenGameParticipantUncheckedUpdateWithoutOpenGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    playersJoined?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenGameParticipantUncheckedUpdateManyWithoutOpenGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    playersJoined?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}