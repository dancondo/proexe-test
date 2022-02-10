declare interface UpsertUserDto {
  name: string;
  email: string;
}

declare interface UserAddressDto {
  city: string;
  suite: string;
  street: string;
  zipcode: string;
}

declare interface UserDto extends UpsertUserDto {
  id: number;
  username?: string;
  address?: UserAddressDto;
}

