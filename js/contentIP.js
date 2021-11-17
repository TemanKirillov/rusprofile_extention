/**
 * ИНН ИП
 */
function getInnIP() {
    return getInn();
}

/**
 * Наименование организации
 */
function getCompanyNameIP() {
    return getCompanyName();
}

/**
 * Статус компании (действующая или ликвидированная)
 */
function getCompanyStatusIP() {
    var result = $("div.company-status").text();
    if (result === '') {
        return "Действующий ИП";
    }
    return result;
}

/**
 * Основной вид деятельности
 */
function getCompanyMainJobIP() {
    return $("div.tile-item h2.tile-item__title:contains('Виды деятельности') ~ p:nth-child(4)")
        .text()
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Город регистрации ИП
 */
function getCompanyCityIP() {
    var result = $("div.company-requisites dt.company-info__title:contains('Регион') ~ dd")
        .text()
        .replace(/\s+/g, ' ')
        .trim();
    if (result === '') {
        result = $("div.company-requisites dt.company-info__title:contains('Адрес') ~ dd")
            .text()
            .replace(/\s+/g, ' ')
            .trim();
    }

    return result;
}

/**
 * Инфо о банкротстве
 */
function getBankruptcyIP() {
    return getBankruptcy();
}

/**
 * Возвращает полные данные о ИП в виде строки
 */
function getIPDataAsString() {
    var inn = getInnIP();
    var companyName = getCompanyNameIP();
    var companyStatus = getCompanyStatusIP();
    var mainJob = getCompanyMainJobIP();
    var city = getCompanyCityIP();
    var managerType = "ИП";
    var bankruptcy = getBankruptcyIP();
    var url = document.URL;

    var result = `${inn}\t${companyName}\t${companyStatus}\t${mainJob}` +
        `\t\t${city}\t${managerType}\t` +
        `\t\t${bankruptcy}\t\t\t${url}`;

    return result;
}

