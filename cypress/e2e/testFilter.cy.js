const testCase = require('../support/DataCase.js')
const URL = 'https://fgis.gost.ru/fundmetrology/cm/results';
const { TestHelper } = require('../support/TestHelper.js')
const filterValueLocate = '.data-filter-values';



/*
Чек-лист:
Позитивные:
  1) Каждый фильтр ☑
  2) Сброс фильтра ☑
  3) Совокупность каждого к каждому(реализация через алгоритм) ? избыточно ☒
  4) Регистрозависимость ? нужна спека ☒
  5) Граничные для количества символов - нет проверки на кол-во символов, из-за этого криво отображается + были 403 и 414 ошибки ? нужна спека ☑
  6) Какие символы принимает ? нужна спека ☒
  7) Отмена изменений фильтра

Негативные:
  1) Применение фильтра без ввода данных  ☑
  2) Фильтр с разными символами ☒ ? нужна спека(какие символы доступны?)
  3) Регистрозависимость ? нужна спека ☒
  4) Количество символов ☑
  5) Какие символы принимает ? нужна спека
  6) ввод выражений/примитивов - типизация ☒
*/

/* Кнопка Очистить работает как очистить и закрыть?)
  при вводе цифры в даты выбирается дата - фича?
  TODO уточнить, не баг ли? Есть фильтр "наклейка", в таблице нет
  нет валидации на датах от меньшего к большему
  нет проверки на кол-во символов
  при применении пустого фильтра ошибка
*/




describe('testFilter.cy.js', () => {
  let data = testCase.test1.data
  /**
   * Функция заполнения и проверки значения в поле
   * @param {string} locate - локатор элемента 
   * @param {string} data - значение, которое нужно проверить 
   */
  const fillFieldAndCheckData = (locate, data) => { cy.get(locate).type(data).should('have.value', data) };
  /**
   * Функция перехода на основную страницу теста
   * @param {string} URL - ссылка на страницу
   */
  const goToMainPage = (URL) => {
    cy.visit(URL);
    cy.get('.col > .btn').scrollIntoView();
    cy.get('.col > .btn').should('be.visible').click();
  };
  /**
   * Нажатие на кнопку "Настроить фильтр"
   */
  const openFilterMenu = () => {
    cy.get(':nth-child(2) > .btn').should('be.visible').click();
  };
  /**
   * Нажатие на кнопку "Очистить"
   */
  const clearAllFilter = () => {
    cy.get('.ml1').scrollIntoView();
    cy.get('.ml1').should('be.visible').click();
  };

  /**
   * Нажатие на кнопку "Применить"
   */
  const confirmFilter = () => {
    cy.get('.col-24 > :nth-child(1)').scrollIntoView();
    cy.get('.col-24 > :nth-child(1)').should('be.visible').click();
  };

  /**
   * Нажатие на кнопку "Отмена"
   */
  const cancel = () => {
    cy.get('.col-12 > .btn').scrollIntoView();
    cy.get('.col-12 > .btn').should('be.visible').click();
  };

  /**
   * Заполение все полей фильтра
   */
  const fillAllFilter = () => {
    fillFieldAndCheckData('#filter_org_title', data.organization);
    fillFieldAndCheckData('#filter_mi_mitnumber', data.regNumberCiType);
    fillFieldAndCheckData('#filter_mi_mititle', data.nameOfCiType);
    fillFieldAndCheckData('#filter_mi_mitype', data.ciType);
    fillFieldAndCheckData('#filter_mi_modification', data.modificationCi);
    fillFieldAndCheckData('#filter_mi_number', data.serialNumber);
    fillFieldAndCheckData('#filter_verification_date_start', data.verificationDateStart);
    fillFieldAndCheckData('#filter_verification_date_end', data.verificationDateEnd);
    fillFieldAndCheckData('#filter_valid_date_start', data.validDateStart);
    fillFieldAndCheckData('#filter_valid_date_end', data.validDateEnd);
    fillFieldAndCheckData('#filter_result_docnum', data.certificateNumber);
    fillFieldAndCheckData('#filter_sticker_num', data.stickerNumber);
    cy.get('#filter_applicability').select(data.suitability);
  };

  /**
   * Проверка всех "плашек" после применения фильтра
   */
  const checkAllFilterValue = () => {
    cy.get(filterValueLocate).contains(`Организация-поверитель: ${data.organization}`).should('be.visible');
    cy.get(filterValueLocate).contains(`Регистрационный номер типа СИ: ${data.regNumberCiType}`).should('be.visible');
    cy.get(filterValueLocate).contains(`Наименование типа СИ: ${data.nameOfCiType}`).should('be.visible');
    cy.get(filterValueLocate).contains(`Тип СИ: ${data.ciType}`).should('be.visible');
    cy.get(filterValueLocate).contains(`Модификация СИ: ${data.modificationCi}`).should('be.visible');
    cy.get(filterValueLocate).contains(`Заводской номер/ Буквенно-цифровое обозначение: ${data.serialNumber}`).should('be.visible');
    cy.get(filterValueLocate).contains(`Дата поверки: от ${data.verificationDateStart} до ${data.verificationDateEnd}`).should('be.visible');
    cy.get(filterValueLocate).contains(`Действительна до: от ${data.validDateStart} до ${data.validDateEnd}`).should('be.visible');
    cy.get(filterValueLocate).contains(`Номер свидетельства/ Номер извещения: ${data.certificateNumber}`).should('be.visible');
    cy.get(filterValueLocate).contains(`Номер наклейки: ${data.stickerNumber}`).should('be.visible');
    cy.get(filterValueLocate).contains(`Пригодность: ${data.suitability}`).should('be.visible');
  };


  it('Check data all filter values', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillAllFilter();
    cy.get('.col-24 > :nth-child(1)').should('be.visible').click();
    checkAllFilterValue();
    //cy.get('[valign]').should('have.lenght', 0); 
  });

  it('Check data organization filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_org_title', data.organization);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Организация-поверитель: ${data.organization}`).should('be.visible');
  });

  it('Check data reg number of ci type filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_mi_mitnumber', data.regNumberCiType);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Регистрационный номер типа СИ: ${data.regNumberCiType}`).should('be.visible');
  });

  it('Check data name of ci type filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_mi_mititle', data.nameOfCiType);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Наименование типа СИ: ${data.nameOfCiType}`).should('be.visible');
  });

  it('Check data ci type filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_mi_mitype', data.ciType);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Тип СИ: ${data.ciType}`).should('be.visible');
  });

  it('Check data modification ci filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_mi_modification', data.modificationCi);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Модификация СИ: ${data.modificationCi}`).should('be.visible');
  });

  it('Check data serial number filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_mi_number', data.serialNumber);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Заводской номер/ Буквенно-цифровое обозначение: ${data.serialNumber}`).should('be.visible');
  });

  it('Check data verification start date filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_verification_date_start', data.verificationDateStart);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Дата поверки: от ${data.verificationDateStart}`).should('be.visible');
  });

  it('Check data verification date end filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_verification_date_end', data.verificationDateEnd);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Дата поверки: до ${data.verificationDateEnd}`).should('be.visible');
  });

  it('Check data valid start date filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_valid_date_start', data.validDateStart);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Действительна до: от ${data.validDateStart}`).should('be.visible');
  });

  it('Check data valid date end filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_valid_date_end', data.validDateEnd);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Действительна до: до ${data.validDateEnd}`).should('be.visible'); //TODO выглядит прям не ок
  });

  it('Check data certificate number filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_result_docnum', data.certificateNumber);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Номер свидетельства/ Номер извещения: ${data.certificateNumber}`).should('be.visible');
  });

  it('Check data sticker number filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_sticker_num', data.stickerNumber);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Номер наклейки: ${data.stickerNumber}`).should('be.visible');
  });

  it('Check data suitability filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    cy.get('#filter_applicability').select(data.suitability);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Пригодность: ${data.suitability}`).should('be.visible');
  });

  it('Check clear all filter value', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillAllFilter();
    confirmFilter();
    checkAllFilterValue();
    openFilterMenu();
    clearAllFilter();
    cy.get(filterValueLocate).should('exist');
  });

  it('entering one hundred characters in the filter field', () => {
    const fieldValue = new TestHelper().generateString(100);

    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_org_title', fieldValue);
    confirmFilter();

    cy.get(filterValueLocate)
      .contains(`Организация-поверитель: ${fieldValue}`)
      .invoke('css', 'width')
      .then(str => parseInt(str))
      .should('be.lt', 1000);
  });

  it('Check null filter', () => {
    goToMainPage(URL);
    openFilterMenu();
    confirmFilter();
    cy.get(filterValueLocate).should('exist');
  });

  it('Check canceling the changes on the filter', () => {
    goToMainPage(URL);
    openFilterMenu();
    fillFieldAndCheckData('#filter_org_title', data.organization);
    confirmFilter();
    cy.get(filterValueLocate).contains(`Организация-поверитель: ${data.organization}`).should('be.visible');
    openFilterMenu();
    cancel();
    cy.get(filterValueLocate).contains(`Организация-поверитель: ${data.organization}`).should('be.visible');
  });
});