# Руководство по запуску микросервиса

#### 1. Установить зависимости приложения

```
cd taskforce
npm i
```

#### 2. Для работы проекта необходимо установить и запустить Docker

```
cd taskforce/apps/identity/
docker-compose up -d
```

### 3. Добавить файлы с переменными окружения

Файлы c примерами находятся в папке `taskforce\environments\.identity.env-example`
```
.identity.env-example -> .identity.env
```

#### 4. Запустить микросервис

```
nx run identity:serve
```
