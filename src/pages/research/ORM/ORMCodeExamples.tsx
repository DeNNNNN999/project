import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

const ORMCodeExamples: React.FC = () => {
  const prismaExample = `
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id       Int    @id @default(autoincrement())
  bio      String
  user     User   @relation(fields: [userId], references: [id])
  userId   Int    @unique
}

// Использование в коде
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Создание пользователя с профилем
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'John Doe',
      profile: {
        create: {
          bio: 'Разработчик TypeScript'
        }
      }
    }
  })
  
  // Создание поста для пользователя
  const post = await prisma.post.create({
    data: {
      title: 'Начало работы с Prisma',
      content: 'Prisma делает взаимодействие с базами данных приятным',
      author: {
        connect: { id: user.id }
      }
    }
  })
  
  // Получение пользователя со всеми связанными данными
  const userWithRelations = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      posts: true,
      profile: true
    }
  })
  
  console.log(userWithRelations)
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
`;

  const drizzleExample = `
// schema.ts
import { pgTable, serial, text, varchar, boolean, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  published: boolean('published').default(false).notNull(),
  authorId: integer('author_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  bio: text('bio').notNull(),
  userId: integer('user_id').notNull().references(() => users.id).unique()
});

// Определение отношений
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

// Использование в коде
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users, profiles, posts } from './schema';
import { eq } from 'drizzle-orm';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  // Создание пользователя
  const [user] = await db.insert(users).values({
    email: 'user@example.com',
    name: 'John Doe'
  }).returning();
  
  // Создание профиля
  const [profile] = await db.insert(profiles).values({
    bio: 'Разработчик TypeScript',
    userId: user.id
  }).returning();
  
  // Создание поста
  const [post] = await db.insert(posts).values({
    title: 'Начало работы с Drizzle',
    content: 'Drizzle приближает нас к SQL',
    authorId: user.id
  }).returning();
  
  // Получение пользователя с постами
  const userWithPosts = await db.query.users.findFirst({
    where: eq(users.id, user.id),
    with: {
      posts: true,
      profile: true
    }
  });
  
  console.log(userWithPosts);
}

main().catch(console.error);
`;

  const mikroOrmExample = `
// entities/User.ts
import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Post } from './Post';
import { Profile } from './Profile';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property({ nullable: true })
  name?: string;

  @OneToMany(() => Post, post => post.author)
  posts = new Collection<Post>(this);

  @OneToOne(() => Profile, profile => profile.user, { nullable: true })
  profile?: Profile;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}

// entities/Post.ts
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property({ nullable: true })
  content?: string;

  @Property()
  published = false;

  @ManyToOne(() => User)
  author!: User;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}

// entities/Profile.ts
import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class Profile {
  @PrimaryKey()
  id!: number;

  @Property()
  bio!: string;

  @OneToOne(() => User, user => user.profile)
  user!: User;
}

// Использование в коде
import { MikroORM } from '@mikro-orm/core';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { Profile } from './entities/Profile';

async function main() {
  const orm = await MikroORM.init({
    entities: [User, Post, Profile],
    dbName: 'test',
    type: 'postgresql',
    // другие настройки...
  });
  
  const em = orm.em.fork();
  
  // Создание пользователя с профилем
  const user = em.create(User, {
    email: 'user@example.com',
    name: 'John Doe'
  });
  
  const profile = em.create(Profile, {
    bio: 'Разработчик TypeScript',
    user
  });
  
  user.profile = profile;
  
  // Создание поста
  const post = em.create(Post, {
    title: 'Начало работы с MikroORM',
    content: 'MikroORM предлагает полноценный ORM опыт',
    author: user
  });
  
  // Unit of Work в действии - все изменения отслеживаются и сохраняются за один раз
  await em.flush();
  
  // Получение пользователя с постами и профилем
  const foundUser = await em.findOne(User, { id: user.id }, {
    populate: ['posts', 'profile']
  });
  
  console.log(foundUser);
  
  await orm.close();
}

main().catch(console.error);
`;

  return (
    <section id="code-examples" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Примеры Кода ORM</h2>
      
      <div className="mb-6 text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Prisma</h3>
        <p className="mb-4">
          Пример использования Prisma для определения схемы и работы с данными:
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto mb-6">
          <pre className="p-4 text-sm">
            <code className="language-typescript">{prismaExample}</code>
          </pre>
        </div>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Drizzle ORM</h3>
        <p className="mb-4">
          Пример использования Drizzle - SQL-first ORM с типобезопасностью:
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto mb-6">
          <pre className="p-4 text-sm">
            <code className="language-typescript">{drizzleExample}</code>
          </pre>
        </div>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">MikroORM</h3>
        <p className="mb-4">
          Пример использования MikroORM - полноценной ORM с Unit of Work и Identity Map:
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto">
          <pre className="p-4 text-sm">
            <code className="language-typescript">{mikroOrmExample}</code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default ORMCodeExamples;