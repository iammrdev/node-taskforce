# Руководство по запуску микросервиса


#### 1. Установить зависимости приложения
```
cd taskforce
npm i
```

#### 2. Для работы проекта необходимо установить и запустить Docker
```
cd taskforce/apps/feedback/
docker-compose up -d
```

### 3. Добавить файлы с переменными окружения

Файлы c примерами находятся в папке `taskforce\environments\.feedback.env-example`
```
.feedback.env-example -> .feedback.env
```

#### 4. Сгенерировать PrismaClient

Для работы проекта необходимо сгенерировать независимые PrismaClient и запустить миграции.

```
cd taskforce

nx run feedback:db-generate
nx run feedback:db-migrate
```

Важно: после установки зависимостей необходима генерировать PrismaClient заново.

#### 5. Запустить микросервис
```
nx run feedback:serve
```
