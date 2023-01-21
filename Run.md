# Руководство по запуску приложения

Приложение состоит из 4 микросервисов, которые запускаются независимо.

#### 1. Установить зависимости приложения

```
cd taskforce
npm i
```

#### 2. Для работы проекта необходимо установить и запустить Docker в каждом микросервисе

```
# identity
cd taskforce/apps/identity/
docker-compose up -d

# notifier
cd taskforce/apps/notifier/
docker-compose up -d

# tasks (зависит от сервиса notifier)
cd taskforce/apps/tasks/
docker-compose up -d

# feedback
cd taskforce/apps/feedback/
docker-compose up -d

```

### 3. Добавить файлы с переменными окружения

Файлы c примерами находятся в папке `taskforce\environments\.<service>.env-example`

```
.<service>.env-example -> .<service>.env
```

#### 4. Сгенерировать PrismaClient

Для работы проектов `tasks` и `feedback` необходимо сгенерировать независимые PrismaClient и запустить миграции

```
cd taskforce

# tasks
nx run tasks:db-generate
nx run tasks:db-migrate

# feedback
nx run feedback:db-generate
nx run feedback:db-migrate
```

Важно: после установки зависимостей необходима генерировать PrismaClient заново.

#### 5. Запустить каждый микросервис

```
# identity
nx run identity:serve

# tasks
nx run tasks:serve

# feedback
nx run feedback:serve

# notifier
nx run notifier:serve
```
