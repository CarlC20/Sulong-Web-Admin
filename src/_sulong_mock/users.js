import mock from './mock';
import { randomNumberRange, randomInArray } from './funcs';
import { CarlPic, JeraldPic, GabPic, MaychaPic, JoelPic } from '../assets';

export const councilCards = [...Array(5)].map((_, index) => ({
  id: ['1', '2', '3', '4', '5'][index],
  profilePic: [CarlPic, JeraldPic, GabPic, MaychaPic, JoelPic][index],
  cover: mock.image.cover(index),
  name: [
    'John Carl E. Castillano',
    'Jerald S. Lanuza',
    'Gabriel Jhereau G. Domingo',
    'Maycha Devocion Jamera',
    'Joel S. Jimenez',
  ][index],
  position: [
    'Lead Programmer / System Analyst',
    'Lead Designer / Researcher',
    'Mobile & Database Programmer',
    'Mobile Programmer / Designer',
    'Project Adviser',
  ][index],
  facebookLink: [
    'https://facebook.com/castillano.ph/',
    'https://www.facebook.com/Jeraldzkiee',
    'https://www.facebook.com/jhereau.domingo',
    'https://www.facebook.com/rein.v.desu',
    'https://www.facebook.com/PublikKlassRum',
  ][index],
  instagramLink: [
    'https://www.instagram.com/carlcstlln/',
    'https://www.instagram.com/jrld_lnz20/',
    '',
    'https://www.instagram.com/rhein_0527/',
  ][index],
  twitterLink: ['https://twitter.com/jc_cstlln', 'https://twitter.com/jrldlnz', 'https://twitter.com/jhereauDomz'][
    index
  ],
  yearbookSaying: [
    '"Jack of all trades is a master of none, but oftentimes better than a master of one."',
    '"Success is not final, failure is not fatal. It is the courage to continue that counts. Be different. Be you."',
    '"Im an addict, addicted to success, thankfully there’s no rehab for success.. otw to be Top G"',
    '"If you want it, go for it. Take a risk. Don’t always play it safe or you’ll die wondering."',
    '". . ."',
  ][index],
}));

export const _userList = [...Array(10)].map((_, index) => ({
  id: mock.id(index),
  avatarUrl: mock.image.avatar(index),
  name: mock.name.fullName(index),
  email: mock.email(index),
  address: mock.address(index),
  country: mock.country(index),
  city: mock.city(index),
}));
