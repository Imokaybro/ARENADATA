


describe('testFilter.cy.js', () => {
  const testCase = require('./DataCase.js')
  let data = testCase.test1.data
  const URL = 'https://fgis.gost.ru/fundmetrology/cm/results';
  /**
   * Функция заполнения и проверки значения в поле
   * @param {string} locate - локатор элемента 
   * @param {string} data - значение, которое нужно проверить 
   */
  const fillFieldAndCheckData = (locate, data) => { cy.get(locate).type(data).should('have.value', data) };
  /**
   * Функция перехода на основную страницу теста
   * @param {string} URL 
   */
  const goToMainPage = (URL) => {
    cy.visit(URL);
    cy.get('.col > .btn').scrollIntoView();
    cy.get('.col > .btn').should('be.visible').click();
    cy.get(':nth-child(2) > .btn').should('be.visible').click();
  };

  const confirmFilter = () => {
    cy.get('.col-24 > :nth-child(1)').scrollIntoView();
    cy.get('.col-24 > :nth-child(1)').should('be.visible').click();
  };


  it('Check data all filter values', () => {
    goToMainPage(URL);

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
    fillFieldAndCheckData('#filter_sticker_num', data.stickerNumber); //TODO уточнить, не баг ли? Фильтр есть, в таблице нет
    cy.get('#filter_applicability').select(data.suitability);
    cy.get('.col-24 > :nth-child(1)').should('be.visible').click();
    //cy.get('[valign]').should('have.lenght', 0); 

    cy.get('.data-filter-values').contains(`Организация-поверитель: ${data.organization}`).should('be.visible');
    cy.get('.data-filter-values').contains(`Регистрационный номер типа СИ: ${data.regNumberCiType}`).should('be.visible');
    cy.get('.data-filter-values').contains(`Наименование типа СИ: ${data.nameOfCiType}`).should('be.visible');
    cy.get('.data-filter-values').contains(`Тип СИ: ${data.ciType}`).should('be.visible');
    cy.get('.data-filter-values').contains(`Модификация СИ: ${data.modificationCi}`).should('be.visible');
    cy.get('.data-filter-values').contains(`Заводской номер/ Буквенно-цифровое обозначение: ${data.serialNumber}`).should('be.visible');
    cy.get('.data-filter-values').contains(`Дата поверки: от ${data.verificationDateStart} до ${data.verificationDateEnd}`).should('be.visible');
    cy.get('.data-filter-values').contains(`Действительна до: от ${data.validDateStart} до ${data.validDateEnd}`).should('be.visible');
    cy.get('.data-filter-values').contains(`Номер свидетельства/ Номер извещения: ${data.certificateNumber}`).should('be.visible');
    cy.get('.data-filter-values').contains(`Номер наклейки: ${data.stickerNumber}`).should('be.visible');
    cy.get('.data-filter-values').contains(`Пригодность: ${data.suitability}`).should('be.visible');
  })

  it('Check data organization filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_org_title', data.organization);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Организация-поверитель: ${data.organization}`).should('be.visible');
  })

  it('Check data reg number of ci type filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_mi_mitnumber', data.regNumberCiType);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Регистрационный номер типа СИ: ${data.regNumberCiType}`).should('be.visible');
  })

  it('Check data name of ci type filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_mi_mititle', data.nameOfCiType);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Наименование типа СИ: ${data.nameOfCiType}`).should('be.visible');
  })

  it('Check data ci type filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_mi_mitype', data.ciType);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Тип СИ: ${data.ciType}`).should('be.visible');
  })

  it('Check data modification ci filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_mi_modification', data.modificationCi);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Модификация СИ: ${data.modificationCi}`).should('be.visible');
  })

  it('Check data serial number filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_mi_number', data.serialNumber);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Заводской номер/ Буквенно-цифровое обозначение: ${data.serialNumber}`).should('be.visible');
  })

  it('Check data verification start date filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_verification_date_start', data.verificationDateStart);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Дата поверки: от ${data.verificationDateStart}`).should('be.visible');
  })

  it('Check data verification date end filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_verification_date_end', data.verificationDateEnd);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Дата поверки: до ${data.verificationDateEnd}`).should('be.visible');
  })

  it('Check data valid start date filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_valid_date_start', data.validDateStart);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Действительна до: от ${data.validDateStart}`).should('be.visible');
  })

  it('Check data valid date end filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_valid_date_end', data.validDateEnd);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Действительна до: до ${data.validDateEnd}`).should('be.visible'); //TODO выглядит прям не ок
  })

  it('Check data certificate number filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_result_docnum', data.certificateNumber);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Номер свидетельства/ Номер извещения: ${data.certificateNumber}`).should('be.visible');
  })

  it('Check data sticker number filter value', () => {
    goToMainPage(URL);
    fillFieldAndCheckData('#filter_sticker_num', data.stickerNumber);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Номер наклейки: ${data.stickerNumber}`).should('be.visible');
  })

  it('Check data suitability filter value', () => {
    goToMainPage(URL);
    cy.get('#filter_applicability').select(data.suitability);
    confirmFilter();
    cy.get('.data-filter-values').contains(`Пригодность: ${data.suitability}`).should('be.visible');
  })


  /* 
  Чек-лист:
  Позитивные:
    1) Каждый фильтр ✔
    2) Совокупность каждого к каждому(реализация через алгоритм) ?
    3) Регистрозависимость ? избыточно
    4) Граничные для количества символов - сломалась верстка + сыпят 403 и 414 ошибки
    
  Негативные:
    1) Фильтр с отсутвующими значениями
    2) Фильтр с несуществующими значениями
    3) Фильтр с невалидными значениями:
      I) Регистр
      II) Количество символов
      III) Какие символы принимает?
      IV) ввод примитивов - на типизацию глянуть
  */

  /* Кнопка Очистить работает как очистить и закрыть?)э
    при вводе цифры в даты выбирается дата - фича?
    todo про номер наклейки
    нет валидации на датах от меньшего к большему
  */
})