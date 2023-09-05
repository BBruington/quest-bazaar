export type UserEventData = {
  data: {
    backup_code_enabled: boolean;
    banned: boolean;
    birthday: string;
    create_organization_enabled: boolean;
    created_at: number;
    delete_self_enabled: boolean;
    email_addresses: {
      email_address: string;
      id: string;
      linked_to: {
        id: string;
        type: string;
      }[];
      object: string;
      reserved: boolean;
      verification: {
        attempts: null;
        expire_at: null;
        status: string;
        strategy: string;
      };
    }[];
    external_accounts: {
      approved_scopes: string;
      avatar_url: string;
      email_address: string;
      first_name: string;
      id: string;
      identification_id: string;
      image_url: string;
      label: null;
      last_name: string;
      object: string;
      provider: string;
      provider_user_id: string;
      public_metadata: Record<string, string | boolean | number>;
      username: string;
      verification: {
        attempts: null;
        expire_at: number;
        status: string;
        strategy: string;
      };
    }[];
    external_id: null;
    first_name: null;
    gender: string;
    has_image: boolean;
    id: string;
    image_url: string;
    last_name: null;
    last_sign_in_at: null;
    object: string;
    password_enabled: boolean;
    phone_numbers: number[] | string[]; // You might want to define a more specific type here
    primary_email_address_id: string;
    primary_phone_number_id: null;
    primary_web3_wallet_id: null;
    private_metadata: Record<string, string | boolean | number>; // You might want to define a more specific type for metadata
    profile_image_url: string;
    public_metadata: Record<string, string | boolean | number>; // You might want to define a more specific type for metadata
    saml_accounts: string[]; // You might want to define a more specific type here
    totp_enabled: boolean;
    two_factor_enabled: boolean;
    unsafe_metadata: Record<string, string | boolean | number>; // You might want to define a more specific type for metadata
    updated_at: number;
    username: string;
    web3_wallets: []; // You might want to define a more specific type here
  };
  object: "event";
  type: "user.created" | "user.updated" | "user.deleted";
};