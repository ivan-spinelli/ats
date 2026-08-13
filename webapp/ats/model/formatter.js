sap.ui.define([], function () {
    "use strict"

    const STOP_WORDS = {
        en: new Set(['about', 'after', 'also', 'and', 'are', 'with', 'will', 'your', 'from', 'have', 'into', 'our', 'that', 'the', 'this', 'through', 'you', 'for', 'job', 'role', 'team', 'work', 'years', 'experience', 'skills']),
        es: new Set(['a', 'al', 'algo', 'algunos', 'ante', 'antes', 'como', 'con', 'contra', 'cual', 'cuando', 'de', 'del', 'desde', 'donde', 'durante', 'el', 'ella', 'ellos', 'en', 'entre', 'era', 'es', 'esa', 'ese', 'esta', 'este', 'esto', 'fue', 'han', 'hasta', 'hay', 'la', 'las', 'le', 'les', 'lo', 'los', 'mas', 'me', 'mi', 'mis', 'mismo', 'mucho', 'muy', 'nos', 'nuestra', 'nuestro', 'o', 'para', 'pero', 'por', 'porque', 'que', 'quien', 'se', 'ser', 'sin', 'sobre', 'son', 'su', 'sus', 'tambien', 'te', 'tener', 'tu', 'tus', 'una', 'uno', 'usted', 'ustedes', 'ya', 'años', 'experiencia', 'habilidades', 'puesto', 'rol', 'trabajo', 'equipo', 'buscamos', 'busca'])
    }

    const normalise = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9+# ]/g, ' ');

    return {
        terms: function(value, language) {
            let stopWords = language === 'es' ? STOP_WORDS.es : STOP_WORDS.en;
            return [...new Set(normalise(value).split(/\s+/).filter(word => word.length > 2 && !stopWords.has(word)))];
        }
    }
});