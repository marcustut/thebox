/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewUser, Role, PastoralStatus, Gender, Satellite } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateNewUser
// ====================================================

export interface CreateNewUser_createUser_profile_address {
  __typename: "Address";
  id: string;
  city: string;
  line1: string;
  line2: string | null;
  state: string;
  country: string;
  postalCode: string;
}

export interface CreateNewUser_createUser_profile {
  __typename: "Profile";
  id: string;
  status: PastoralStatus | null;
  gender: Gender;
  satellite: Satellite | null;
  nameEng: string;
  nameChi: string | null;
  contact: string;
  dob: TheBox.Time;
  bio: string | null;
  tngReceiptUrl: string | null;
  avatarUrl: string | null;
  createdAt: TheBox.Time;
  updatedAt: TheBox.Time;
  address: CreateNewUser_createUser_profile_address | null;
  invitedBy: string | null;
}

export interface CreateNewUser_createUser {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  createdAt: TheBox.Time;
  updatedAt: TheBox.Time;
  roles: Role[];
  profile: CreateNewUser_createUser_profile | null;
}

export interface CreateNewUser {
  createUser: CreateNewUser_createUser | null;
}

export interface CreateNewUserVariables {
  param: NewUser;
}
