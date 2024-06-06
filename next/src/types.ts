export interface jwtToken {
  iat: number;
  exp: number;
  roles: string[];
  username: string;
}

export interface Fine {
  id: number;
  amount: number;
  code: string;
  created_at: string;
  updated_at: string;
  // payment: null | {
  //   id: number;
  //   user_id: number;
  //   fine_id: number;
  //   card_number: string;
  //   expiration: string;
  //   cryptogram: string;
  //   created_at: string;
  //   updated_at: string;
  // };
}
