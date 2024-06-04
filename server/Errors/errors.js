class CustomError {
    //& Ошибка: Ресурс не найден
    //* Комментарий: Используется, когда запрашиваемый ресурс не найден.
    handleNotFound(res, additionalMessage = null, status = 404) {
        const errorMessage = additionalMessage
        return res.status(status).json({ message: errorMessage, status: status });
    }

    //& Ошибка: Неверный запрос
    //* Комментарий: Используется, когда запрос клиента некорректен или не может быть выполнен.
    handleBadRequest(res, additionalMessage = null, status = 400) {
        const errorMessage = additionalMessage
        return res.status(status).json({ message: errorMessage, status: status });
    }

    //& Ошибка: Внутренняя ошибка сервера
    //* Комментарий: Используется, когда на сервере происходит внутренняя ошибка, не предвиденная клиентом.
    handleInternalServerError(res, additionalMessage = null, status = 500) {
        const errorMessage = additionalMessage
        return res.status(status).json({ message: errorMessage, status: status });
    }

    //& Ошибка: Неправильный формат данных
    //* Комментарий: Используется, когда данные, предоставленные клиентом, имеют неверный формат.
    handleInvalidData(res, additionalMessage = null, status = 422) {
        const errorMessage = additionalMessage
        return res.status(status).json({ message: errorMessage, status: status });
    }

    //& Ошибка: Недостаточные права доступа
    //* Комментарий: Используется, когда у пользователя нет достаточных прав для выполнения определенного действия.
    handleInsufficientPermissions(res, additionalMessage = null, status = 403) {
        const errorMessage = additionalMessage
        return res.status(status).json({ message: errorMessage, status: status });
    }

    //& Ошибка: Дублирование ресурса
    //* Комментарий: Используется, когда создается ресурс, который уже существует.
    handleDuplicateResource(res, additionalMessage = null, status = 409) {
        const errorMessage = additionalMessage
        return res.status(status).json({ message: errorMessage, status: status });
    }

    //& Ошибка: Доступ к ресурсу запрещен из-за блокировки
    //* Комментарий: Используется, когда попытка доступа к ресурсу (например, пользователю) запрещена из-за блокировки.
    handleBlockedResource(res, additionalMessage = null, status = 403) {
        const errorMessage = additionalMessage
        return res.status(status).json({ message: errorMessage, status: status });
    }
}

module.exports = new CustomError();