import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async(req, res, next) => {
    req.context = {
        models,
    };
    next();
});

// Routes

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/requests', routes.request);
app.use('/artists', routes.artist);
app.use('/events', routes.happening);
app.use('/releases', routes.release);
app.use('/musics', routes.music);
app.use('/calendar', routes.calendar);
app.use('/styles', routes.style);
app.use('/notifications', routes.notification);
app.use('/infos', routes.info);

// Start

const eraseDatabaseOnSync = false;
const doCreateSeeds = true;

sequelize
    .sync({ force: eraseDatabaseOnSync && process.env.DEV })
    .then(async() => {
        if (eraseDatabaseOnSync && doCreateSeeds && process.env.DEV) {
            createSeeds();
        }

        app.listen(process.env.PORT || 3000, () =>
            console.log(
                `Example app listening on port ${process.env.PORT || 3000}!`,
            ),
        );
    });

const today = new Date();
const tomorrow = new Date();
const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1,
);

tomorrow.setDate(today.getDate() + 1);

const createSeeds = async() => {
    await models.User.create({
        id: '1',
        username: 'rwieruch',
        email: 'rwieruch@tst',
        avatar: 'https://static.wikia.nocookie.net/naruto/images/f/f1/Naruto_Partie_I.png/revision/latest?cb=20151201180820&path-prefix=fr',
        artists: [{ name: 'artist' }],
        requests: [{
            state: 'PENDING',
            method: 'POST',
            checked_by: 2,
            endpoint: '/artists',
            body: { name: 'Amir' },
            currentData: { name: 'John' },
            source: 'ça se fait pas',
        }, ],
        releases: [
            { date: today, name: 'relasecool', type: 'ALBUM' },
            { date: tomorrow, name: 'releasenew', type: 'ALBUM' },
            { date: nextMonth, name: 'reallse', type: 'ALBUM' },
        ],
        artists: [{ name: 'JohnBoy' }],
        notifications: [{ type: 'GENERAL' }],
    }, {
        include: [
            models.Artist,
            models.Request,
            models.Release,
            models.Notification,
        ],
    }, );

    await models.User.create({
        id: '2',
        username: 'ddavids',
        email: 'rwieruch@tt',
    }, {
        include: [models.Artist, models.Request],
    }, );

    await models.Artist.create({
        name: 'NCT',
        image: 'https://altselection.com/wp-content/uploads/2020/11/nct-2020.jpg',
        type: 'GROUP',
        website: null,
        description: 'NCT is a South Korean boy band created by the label SM Entertainment that debuted in 2016. The groups name is short for Neo Culture Technology, a term coined by Lee Soo Man, the founder of SM Entertainment. The concept of the group is to have an unlimited number of members divided into several sub-units around the world. Members are free to stay or leave the group and other members can be added at any time. The long-term goal for the agency is to have active sub-units in several countries such as China, Japan etc...',
        socials: ['https://www.facebook.com/2NE1/'],
        platforms: [
            'https://music.youtube.com/channel/UCwPKPUAWE8ah0lkOcvNh8_Q',
        ],
        styles: ['KPOP'],
        members: [{
            name: 'WayV',
            image: 'https://fstvls.s3.amazonaws.com/67/66506.jpg',
            type: 'GROUP',
            website: null,
            description: 'WayV (Chinese: 威神V, pinyin: Wēi Shén V) is a Chinese boy band, more precisely it is the fourth sub-unit of the South Korean boy band NCT, so it is considered the Chinese unit of NCT, grouping most of NCTs members of Chinese origin. The group is composed of seven members: Kun, Ten, Winwin, Lucas, Xiaojun, Hendery, and Yangyang.',
            socials: ['https://www.instagram.com/WayVofficial/'],
            platforms: [
                'https://music.youtube.com/channel/UC5qKojRk3tgoWJZTSVCE9HQ',
            ],
            styles: ['KPOP'],
        }, ],
    }, {
        include: [
            { model: models.User, as: 'followers' },
            { model: models.Artist, as: 'groups' },
            { model: models.Artist, as: 'members' },
            models.Release,
        ],
    }, );

    const artist = await models.Artist.findOne({
        where: { name: 'WayV' },
    });
    const membersArray = [{
            name: 'Kun',
            image: 'https://static.wikia.nocookie.net/k-pop/images/9/99/Bad_Alive_-_Kun_1.jpg/revision/latest?cb=20200728123643&path-prefix=fr',
            type: 'SOLO',
            website: null,
            description: 'Kun (쿤, kun) is a Chinese singer, and rapper, member of NCT. He was introduced as an official member of the group in 2016 during his participation in the Chinese version of "Without You". But he made his official debut in 2018. He is part of the Chinese sub-unit WayV, of which he is the leader.',
            socials: [
                'https://www.instagram.com/kun11xd/?igshid=12ojbjvr1afiy',
            ],
            styles: ['KPOP'],
        },
        {
            name: 'Ten',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ten_Lee_%EB%B3%B4%EB%8A%94_%EB%9D%BC%EB%94%94%EC%98%A4_201124_04.png/270px-Ten_Lee_%EB%B3%B4%EB%8A%94_%EB%9D%BC%EB%94%94%EC%98%A4_201124_04.png',
            type: 'SOLO',
            website: null,
            description: 'Chittaphon Leechaiyapornkul (Thai: ชิตพล ลี้ชัยพรกุล, Chit Phl Iī̂ Chạy Phr Kul; simplified Chinese: 李永钦, traditional Chinese: 李永欽, pinyin: Lǐ Yǒng Qīn) or Lee Young-heum (hangeul: 이영흠, RR: I Yeongheum), better known by his stage name Ten (hangeul: 텐, RR: Ten), is a Thai dancer and singer of Chinese descent in South Korea and China of the South Korean label SM Entertainment. He has been a member of the South Korean boy band NCT since 2016, and its sub-units NCT U and WayV as well as SuperM, which is a "supergroup" ("super group") of SM Entertainment. He makes his China debut with the group WayV in 2019 in the agency Label V a Chinese branch of SM Entertainment',
            socials: [
                'https://www.instagram.com/tenlee_1001/?igshid=1olbzakkvv7ly',
            ],
            platforms: [
                'https://music.youtube.com/channel/UCJOXMxI99o8azJ_uV7qEZdA',
            ],
            styles: ['KPOP'],
        },
        {
            name: 'Win Win',
            image: 'https://img.wattpad.com/de8658b5569f6f9f7aef634a2c4fd9f6802d6d86/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f58616e5130666641774b625766673d3d2d3534393335393835372e313562306332393062396238626565363636353536313933313635362e6a7067?s=fit&w=720&h=720',
            type: 'SOLO',
            website: null,
            description: 'Dong Si-cheng, better known as Winwin, is a Chinese singer and dancer based in South Korea, born on October 28, 1997. Since 2016, he has been a member of the boy band NCT and its sub-units, NCT U, NCT 127 and WayV.',
            socials: ['https://www.instagram.com/wwiinn_7/'],
            styles: ['KPOP'],
        },
        {
            name: 'Lucas',
            image: 'https://k-gen.fr/wp-content/uploads/2019/09/superm-lucas-titre-720x426.png',
            type: 'SOLO',
            website: null,
            description: 'Wong Yuk-hei, better known as Lucas, is a Hong Kong rapper, singer and model of Thai and Chinese descent. He is a member of the South Korean boy group NCT, its Chinese sub-unit WayV and its spinning sub-unit NCT U, as well as the supergroup SuperM',
            socials: ['https://www.instagram.com/lucas_xx444/'],
            platforms: [
                'https://music.youtube.com/channel/UC4vh5ZIUA-1VS1VydX0cFIg',
            ],
            styles: ['KPOP'],
        },
        {
            name: 'Xiao Jun',
            image: 'https://static.wikia.nocookie.net/k-pop/images/1/16/Bad_Alive_-_Xiaojun_1.jpg/revision/latest?cb=20200728124023&path-prefix=fr',
            type: 'SOLO',
            website: null,
            description: 'Xiaojun or Xiao Jun is a Chinese singer and member of the group NCT. He is part of the WayV subunit in which he officially debuted on January 17, 2019 with the release of the group\'s first single "The Vision".',
            socials: [
                'https://www.instagram.com/djxiao_888/?igshid=nmq0qb66hab2',
            ],
            styles: ['KPOP'],
        },
        {
            name: 'Hendery',
            image: 'https://45secondes.fr/wp-content/uploads/2020/11/Hendery-de-NCT-montre-son-cote-sexy-dans-les-photos.jpeg',
            type: 'SOLO',
            website: null,
            description: 'Hendery is a Chinese dancer and singer from the Macau autonomous administrative region of China. He has been part of the SMROOKIES project since July 2018, and is now a member of the Chinese sub-unit of the NCT group named WayV.',
            socials: [
                'https://www.instagram.com/i_m_hendery/?igshid=1ofvx23ru37pm',
            ],
            styles: ['KPOP'],
        },
        {
            name: 'Yang Yang',
            image: 'https://static.wikia.nocookie.net/wayv/images/c/cb/0310_Profile_YANGYANG.png/revision/latest?cb=20210422182101',
            type: 'SOLO',
            website: null,
            description: 'Yang-Yang or Yang Yang (양양) is a German-Chinese singer, member of the group NCT. He is part of the WayV subunit in which he officially debuted on January 17, 2019 with the release of the group\'s first single "The Vision".',
            socials: ['https://www.instagram.com/yangyang_x2/'],
            styles: ['KPOP'],
        },
    ];

    for (const memberItem of membersArray) {
        artist.createMember(memberItem);
    }

    await models.Artist.create(
      {
        name: 'Alex',
        image:
          'https://cdn.radiofrance.fr/s3/cruiser-production/2021/01/9046b609-68b8-494a-9dfd-53ca91a599a4/1200x680_rihanna.jpg',
        description:
          'Alex est la plus grande artiste de sa génération voire de la génération humaine',
        socials: ['facebooklol'],
        platforms: ['spotift.com'],
        events: [
          {
            startDate: today,
            endDate: nextMonth,
            name: 'Concert incroyable',
          },
        ],
        infos: [
          {
            message: 'hey gu cool info d alex',
            date: nextMonth,
          },
        ],
        followers: [{ id: 'ididi', username: 'jen markuse' }],
        type: 'SOLO',
      },
      {
        include: [
          { model: models.Happening, as: 'events' },
          { model: models.User, as: 'followers' },
          models.Info,
        ],
      },
    );

    await models.Release.create({
        name: 'Turn Back Time',
        type: 'SINGLE',
        date: tomorrow,
        artists: [{ name: 'artist1' }, { name: 'artist2' }],
        musics: [{
            name: 'Turn Back Time (Korean Version)',
            clip: 'https://youtu.be/eUCVRF6hjSQ',
        }, ],
    }, {
        include: [{ model: models.Music, as: 'musics' }, models.Artist],
    }, );
    await models.Release.create({
        name: 'TTime',
        type: 'SINGLE',
        date: tomorrow,
        artists: [{ name: 'artist3' }],
        musics: [{
            name: 'Turn Back Time (Korean Version)',
            clip: 'https://youtu.be/eUCVRF6hjSQ',
        }, ],
    }, {
        include: [{ model: models.Music, as: 'musics' }, models.Artist],
    }, );
    await models.Release.create({
        name: 'ime',
        type: 'SINGLE',
        date: nextMonth,
        artists: [{ name: 'artist3' }],
        musics: [{
            name: 'Turn Back Time (Korean Version)',
            clip: 'https://youtu.be/eUCVRF6hjSQ',
        }, ],
    }, {
        include: [{ model: models.Music, as: 'musics' }, models.Artist],
    }, );
    await models.Release.create({
        name: 'TTime',
        type: 'SINGLE',
        date: today,
        artists: [{ name: 'artist3' }],
        musics: [{
            name: 'Turn Back Time (Korean Version)',
            clip: 'https://youtu.be/eUCVRF6hjSQ',
        }, ],
        followers: [{ id: 'test', username: 'jenamark' }],
    }, {
        include: [
            { model: models.User, as: 'followers' },
            { model: models.Music, as: 'musics' },
            models.Artist,
        ],
    }, );

    await models.Info.create({
      message: 'hey guys cool info',
      date: today,
    });
    await models.Info.create({
      message: 'heguys col info',
      date: today,
    });
    await models.Info.create({
      message: 'hey gus cool info',
      date: tomorrow,
    });
    await models.Info.create({
      message: 'hey guool info',
      date: nextMonth,
    });
    await models.Info.create({
      message: 'hey gu cool info',
      date: nextMonth,
    });
    const release = await models.Release.findOne({
        where: { name: 'Turn Back Time' },
    });

    artist.addRelease(release);
    const artist2 = await models.Artist.findOne({
        where: { name: 'JohnBoy' },
    });
    artist2.addRelease(release);
};