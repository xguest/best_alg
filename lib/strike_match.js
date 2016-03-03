#!/usr/bin/env node
/**
* Не четкое сравнение строк.
* #Concept   Simon White April 07, 2004 <swhite@catalysoft.com>
* #link      http://www.catalysoft.com/articles/StrikeAMatch.html
*            http://www.devarticles.com/cp/bio/Simon-White/
* #Implementation and improved
* @name      strike_match
* @author    XGuest <xguest@list.ru>
* @link      https://github.com/xguest/nice_alg
* @version   0.0.0.1
* @copyright GPL applies.
*            No warranties XGuest[26.01.2005/10:18:28] fuzzy [ver.0.0.0.1]
*            GPL applies.
* #guid      {2DB3A242-F31A-4B7D-9512-567D0D6ECA2B}
*
* @description Симон Уайт в ["How to Strike a Match"][http://www.catalysoft.com/articles/StrikeAMatch.html]
*              от 07 апреля 2004 предложил концепцию расчета, коэффициента
*              нечеткого сравнения строк, как соотношение количества совпадений
*              пересекающихся парах символов (test ==> [te,es,st]) двух слов, и
*              общего количества пар.
*
*              Шаги алгоритма скрипта
*
*  1 - Проверяем наличие параметров
*  2 - Проверяем точное равенство строк
*  3 - Первый цикл обработка параметров
*      Второй - Обработка слов параметра
*      Третий - Обработка пар символов слова
*  4 - В первых двух циклах действия одинаковы
*      В третьем
*        для первого параметра
*         все пары помещаются в объект, где
*             key = пара символов,
*           value = счетчик кол-ва этой пары
*        для второго поиск каждой пары в объекте первого параметра,
*        если успешно прибавляет счетчик общих пар и убавляет счетчик этой пары
*  5 - В завершении циклов умножаем кол-во общих пар 2 (два объекта), делим на
*      общее кол-во пар
*
* @param {String} a  Строка для сравнения
* @param {String} b  Строка для сравнения
*
* @return {Number|undefined} - undefined если одна из строк === undefined
*                                0  - нет общих пар
*                             до 1  - коэффициент соотношения
*                                1  - относительное равенство строк
*                                2  - точное равенство строк
*/
/*eslint complexity: [2, 9]*/
function strike_match(a, b) {
  if (a && b) {                                      // Наличие параметров
    if (a === b) return 2;                           // Если равны
    b = [a, b]; a = 2;                               // Массив параметров
    var c, d, e, f, g, h, i = 0, j, k = {}, l = 0;
    for (c = 0; c < 2; c++) {                        // Обработка параметров
      d = b[c].toLowerCase().split(/\s+/g);          // Массив слов
      e = d.length;                                  // Размер = кол-во слов
      for (f = 0; f < e; f++) {                      // Обработка слов
        g = d[f].length - 1;                         // Длинна слова
        for (h = 0; h < g; h++) {                    // Обработка пар символов
          i++;                                       // Счетчик пар
          j = d[f].substr(h, 2);                     // Текущая пара
          if (c) {                                   // Параметр не первый
            if (k[j]) {                              // Счетчик есть
              --k[j];                                // Dec счетчика пар
              ++l;                                   // Inc счетчика совпадений
            }
          } else {                                   // Первый параметр
            k[j] = ++k[j] || 1;                      // Inc счетчика пар
          }
        }
      }
    }
    return Number((2 * l / i).toFixed(2));           // Определяем соотношение
  }                                                  // одинаковых пар к кол-ву
}
module.exports = strike_match;
