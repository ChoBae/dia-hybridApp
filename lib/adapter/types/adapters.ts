// import type { Account, Awaitable, User } from './types.js';
export type Awaitable<T> = T | PromiseLike<T>;
export type ProviderType = 'oidc' | 'oauth' | 'email' | 'credentials';
type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonValue[];
type JsonObject = {
  [Key in string]?: JsonValue;
};
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export interface OpenIDTokenEndpointResponse {
  readonly access_token: string;
  readonly expires_in?: number;
  readonly id_token: string;
  readonly refresh_token?: string;
  readonly scope?: string;
  /** NOTE: because the value is case insensitive it is always returned lowercased */
  readonly token_type: string;
  readonly [parameter: string]: JsonValue | undefined;
}
export interface Account extends Partial<OpenIDTokenEndpointResponse> {
  /** Provider's id for this account. Eg.: "google" */
  provider: string;
  /**
   * This value depends on the type of the provider being used to create the account.
   * - oauth/oidc: The OAuth account's id, returned from the `profile()` callback.
   * - email: The user's email address.
   * - credentials: `id` returned from the `authorize()` callback
   */
  providerAccountId: string;
  /** Provider's type for this account */
  type: ProviderType;
  /**
   * id of the user this account belongs to
   *
   * @see https://authjs.dev/reference/core/adapters#user
   */
  userId?: string;
  /**
   * Calculated value based on {@link OAuth2TokenEndpointResponse.expires_in}.
   *
   * It is the absolute timestamp (in seconds) when the {@link OAuth2TokenEndpointResponse.access_token} expires.
   *
   * This value can be used for implementing token rotation together with {@link OAuth2TokenEndpointResponse.refresh_token}.
   *
   * @see https://authjs.dev/guides/basics/refresh-token-rotation#database-strategy
   * @see https://www.rfc-editor.org/rfc/rfc6749#section-5.1
   */
  expires_at?: number;
}

export interface AdapterAccount extends Account {
  userId: string;
  type: Extract<ProviderType, 'oauth' | 'oidc' | 'email'>;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
export interface AdapterSession {
  /**
   * A randomly generated value that is used to look up the session in the database
   * when using `"database"` `AuthConfig.strategy` option.
   * This value is saved in a secure, HTTP-Only cookie on the client.
   */
  sessionToken: string;
  /** Connects the active session to a user in the database */
  userId: string;
  /**
   * The absolute date when the session expires.
   *
   * If a session is accessed prior to its expiry date,
   * it will be extended based on the `maxAge` option as defined in by `SessionOptions.maxAge`.
   * It is never extended more than once in a period defined by `SessionOptions.updateAge`.
   *
   * If a session is accessed past its expiry date,
   * it will be removed from the database to clean up inactive sessions.
   *
   */
  expires: Date;
}

export interface AdapterUser extends User {
  /** A unique identifier for the user. */
  id: string;
  /** The user's email address. */
  email: string;
  /**
   * Whether the user has verified their email address via an [Email provider](https://authjs.dev/reference/core/providers/email).
   * It is `null` if the user has not signed in with the Email provider yet, or the date of the first successful signin.
   */
  email_verified: Date | null;
  username: string;
  image_url: string;
}

export interface VerificationToken {
  /** The user's email address. */
  identifier: string;
  /** The absolute date when the token expires. */
  expires: Date;
  /**
   * A [hashed](https://authjs.dev/concepts/hashing) token, using the `AuthConfig.secret` value.
   */
  token: string;
}

export interface Adapter {
  createUser?(user: Omit<AdapterUser, 'id'>): Awaitable<AdapterUser>;
  getUser?(id: string): Awaitable<AdapterUser | null>;
  getUserByEmail?(email: string): Awaitable<AdapterUser | null>;
  /** Using the provider id and the id of the user for a specific account, get the user. */
  getUserByAccount?(
    providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
  ): Awaitable<AdapterUser | null>;
  updateUser?(user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>): Awaitable<AdapterUser>;
  /** @todo This method is currently not invoked yet. */
  deleteUser?(userId: string): Promise<void> | Awaitable<AdapterUser | null | undefined>;
  /**
   * This method is invoked internally (but optionally can be used for manual linking).
   * It creates an [Account](https://authjs.dev/reference/core/adapters#models) in the database.
   */
  linkAccount?(
    account: AdapterAccount
  ): Promise<void> | Awaitable<AdapterAccount | null | undefined>;
  /** @todo This method is currently not invoked yet. */
  unlinkAccount?(
    providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
  ): Promise<void> | Awaitable<AdapterAccount | undefined>;
  /** Creates a session for the user and returns it. */
  createSession?(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Awaitable<AdapterSession>;
  getSessionAndUser?(
    sessionToken: string
  ): Awaitable<{ session: AdapterSession; user: AdapterUser } | null>;
  updateSession?(
    session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>
  ): Awaitable<AdapterSession | null | undefined>;
  /**
   * Deletes a session from the database. It is preferred that this method also
   * returns the session that is being deleted for logging purposes.
   */
  deleteSession?(
    sessionToken: string
  ): Promise<void> | Awaitable<AdapterSession | null | undefined>;
  createVerificationToken?(
    verificationToken: VerificationToken
  ): Awaitable<VerificationToken | null | undefined>;
  /**
   * Return verification token from the database and delete it so it cannot be
   * used again.
   */
  useVerificationToken?(params: {
    identifier: string;
    token: string;
  }): Awaitable<VerificationToken | null>;
}
