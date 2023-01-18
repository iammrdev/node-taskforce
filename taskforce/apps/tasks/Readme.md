# Руководство по запуску микросервиса


#### 1. Установить зависимости приложения
```
cd taskforce
npm i
```

#### 2. Для работы проекта необходимо установить и запустить Docker
```
cd taskforce/apps/tasks/
docker-compose up -d
```

### 3. Добавить файлы с переменными окружения

Файлы c примерами находятся в папке `taskforce\environments\.tasks.env-example`
```
.tasks.env-example -> .tasks.env
```

#### 4. Сгенерировать PrismaClient

Для работы проекта необходимо сгенерировать независимые PrismaClient и запустить миграции.
Важно: после установки зависимостей необходима генерировать PrismaClient заново.
```
cd taskforce

nx run tasks:db-generate
nx run tasks:db-migrate
```

#### 5. Запустить микросервис
```
nx run tasks:serve
```
