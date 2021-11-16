/**
 * Копирует строку в буфер обмена
 */
function copyToClipboard(string) {
    var aux = document.createElement("input");
    aux.setAttribute("value", string);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}

/**
 * Извлекает тип страницы из URL
 *
 * @returns {string} id (компании), ip (ИП)
 */
function getTypePageFromURL() {
    var typePage = document.URL.split("/")[3];
    if (typePage === undefined) {
        return "";
    }
    return typePage;
}

/**
 * ИНН
 */
function getInn() {
    return $('#clip_inn').text();
}

/**
 * Наименование организации
 */
function getCompanyName() {
    return $(".company-name")
        .text()
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Статус компании (действующая или ликвидированная)
 */
function getCompanyStatus() {
    return $("#anketa > div.anketa-top > div > div.company-status").text();
}

/**
 * Основной вид деятельности
 */
function getCompanyMainJob() {
    return $("#anketa > div.clear > div.rightcol > div:nth-child(1) > span.company-info__text")
        .text()
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Юридический адрес
 */
function getCompanyAddress() {
    return $("#anketa > div.clear > div.leftcol > div:nth-child(2) > address")
        .text()
        .replace(/\s+/g, ' ')
        .trim()
}

/**
 * Город регистрации компании
 */
function getCompanyCity() {
    var result = $("span[itemprop='addressLocality']").text().trim();
    if (result === '') {
        result = $("meta[itemprop='addressLocality']")[0]
        if (result === undefined) {
            return '';
        }
        return result.getAttribute("content");
    }

    return result;
}

/**
 * Тип управления
 */
function getManagerType() {
    if ($(".company-row:contains('Управляющая организация')").text() !== '') {
        return 'Управляющая организация';
    }
    if ($(".company-row:contains('Руководитель')").text() !== '') {
        return 'Руководитель';
    }

    return 'Неизвестный тип';
}

/**
 * Руководитель или управляющая организация
 */
function getManager() {
    var managerOrganization = $(".company-row:contains('Управляющая организация') > span.company-info__text").text();
    if (managerOrganization === '') {
        return $(".company-row:contains('Руководитель') > span.company-info__text").text();
    }

    return managerOrganization;
}

/**
 * Численность персонала
 */
function getCompanyPopulation() {
    return $(".quetip")
        .text()
        .replace(/\s+/g, ' ')
        .trim()
}

/**
 * Инфо о банкротстве
 */
function getBankruptcy() {
    var result = $(".company-bankruptcy-row > div.text-red").text();

    if (result === '') {
        result = $(".company-bankruptcy-row").text();
    }
    return result
        .replace(/\s+/g, ' ')
        .trim()
        .replace("Банкротство В соответствии с данными Единого федерального ресурса сведений о банкротстве (ЕФРСБ), организация ", "");
}

/**
 * Извлечь финансовую информацию из заданной колонки
 */
function getFinanceData(column) {
    return $(`div.finance-columns > div.finance-col:contains(${column}) > div.finance-data`)
        .text()
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Выручка
 */
function getRevenue() {
    return getFinanceData('Выручка');
}

/**
 * Прибыль
 */
function getProfit() {
    return getFinanceData('Прибыль');
}

/**
 * Возвращает полные данные о компании в виде строки
 */
function getCompanyDataAsString() {
    var inn = getInn();
    var companyName = getCompanyName();
    var companyStatus = getCompanyStatus();
    var mainJob = getCompanyMainJob();
    var companyAddress = getCompanyAddress();
    var city = getCompanyCity();
    var managerType = getManagerType();
    var manager = getManager();
    var population = getCompanyPopulation();
    var bankruptcy = getBankruptcy();
    var revenue = getRevenue();
    var profit = getProfit();
    var url = document.URL;

    var result = `${inn}\t${companyName}\t${companyStatus}\t${mainJob}` +
                 `\t${companyAddress}\t${city}\t${managerType}\t${manager}` +
                 `\t${population}\t${bankruptcy}\t${revenue}\t${profit}\t${url}`;

    return result;
}

/**
 * Возвращает шапку таблицы
 */
function getTableHeaderAsString() {
    return `ИНН\tНазвание\tСтатус\tОсновной вид деятельности` +
        `\tЮридический адрес\tГород\tТип управления\tУправляющий` +
        `\tСреднесписочная численность\tБанкротство\tВыручка\tПрибыль`;
}

/**
 * Добавить обработчик события getData
 */
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "getData") {

            try {
                if (getTypePageFromURL() === 'id') {
                    copyToClipboard(getCompanyDataAsString());
                }
                else if (getTypePageFromURL() === 'ip') {
                    copyToClipboard(getIPDataAsString());
                }
                else {
                    copyToClipboard("НЕИЗВЕСТНЫЙ ТИП СТРАНИЦЫ!");
                }

            } catch (e) {
                copyToClipboard(" ");
                console.error(e);
            }

        }
    }
);

/**
 * Добавить обработчик события getTableHeader
 */
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "getTableHeader") {
            copyToClipboard(getTableHeaderAsString());
        }
    }
);