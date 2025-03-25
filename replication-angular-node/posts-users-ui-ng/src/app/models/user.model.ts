export class User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  birthday: Date;
  telephone: string;
  country: string;
  bio: string;
  favoriteNumber: string;
  favoriteColor: string;
  avatarImagePath: string;
  agreementLevel: string;
  getsNewsletter: boolean;
  createdAt: Date;

  constructor(firstName: string, lastName: string, gender: string, email: string, password: string,
    birthday: Date, telephone: string, country: string, bio: string,
    favoriteNumber: string, favoriteColor: string, avatarImagePath: string,
    agreementLevel: string, getsNewsletter: boolean, id?: string, createdAt?: Date) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.telephone = telephone;
    this.country = country;
    this.bio = bio;
    this.favoriteNumber = favoriteNumber;
    this.favoriteColor = favoriteColor;
    this.avatarImagePath = avatarImagePath;
    this.agreementLevel = agreementLevel;
    this.getsNewsletter = getsNewsletter;
    if (id)
      this.id = id;
    if (createdAt)
      this.createdAt = createdAt;
  }
}