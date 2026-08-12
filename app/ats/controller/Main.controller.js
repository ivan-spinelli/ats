sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'resume/ats/model/defaultResume',
	'resume/ats/model/formatter'
], function (
	Controller,
	JSONModel,
	defaultResume,
	formatter
) {
	'use strict';

	return Controller.extend('resume.ats.controller.Main', {
		onInit: function () {
			this.getView().setModel(
				new JSONModel({
					language: 'en',
					resumeText: defaultResume.en,
					jobPosting: '',
					hasResult: false,
					error: '',
					defaultButtonType: 'Default'
				}),
				'view'
			);

			this.resourceBundle = this.getOwnerComponent().getModel('i18n').getResourceBundle();
		},

		onToggleLanguage: function () {
			const model = this.getView().getModel('view');
			const language = model.getProperty('/language') === 'en' ? 'es' : 'en';

			model.setProperty('/language', language);
			model.setProperty('/hasResult', false);
			model.setProperty('/error', '');

			sap.ui.getCore().getConfiguration().setLanguage(language);

			this._updateDefaultButton();
		},

		onResumeChange: function () { this._updateDefaultButton(); },

		onUseDefaultResume: function () {
			const model = this.getView().getModel('view');

			model.setProperty('/resumeText', defaultResume[model.getProperty('/language')]);
			model.setProperty('/hasResult', false);
			model.setProperty('/error', '');

			this._updateDefaultButton();
		},

		onClearResume: function () {
			const model = this.getView().getModel('view');

			model.setProperty('/resumeText', '');
			model.setProperty('/hasResult', false);
			model.setProperty('/error', '');

			this._updateDefaultButton();
		},

		onAnalyze: function () {
			const model = this.getView().getModel('view');
			const language = model.getProperty('/language');
			const resumeText = model.getProperty('/resumeText').trim();
			const jobPosting = model.getProperty('/jobPosting').trim();

			model.setProperty('/error', '');
			if (!resumeText || !jobPosting) {
				model.setProperty('/error', this._get_from_i18n('missingInput'));
				return;
			}

			const resumeTerms = new Set(formatter.terms(resumeText, language));
			const jobTerms = formatter.terms(jobPosting, language);

			const matchedKeywords = jobTerms.filter(term => resumeTerms.has(term));
			const missingKeywords = jobTerms.filter(term => !resumeTerms.has(term)).slice(0, 20);

			const result = {
				extracted: {
					email: resumeText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || this._get_from_i18n('notFound'),
					phone: resumeText.match(/(?:\+?\d[\d .()-]{7,}\d)/)?.[0] || this._get_from_i18n('notFound'),
					wordCount: resumeText.split(/\s+/).filter(Boolean).length
				},
				matching: {
					score: jobTerms.length ? Math.round((matchedKeywords.length / jobTerms.length) * 100) : 0
				}
			};

			model.setProperty('/result', result);
			model.setProperty('/matchedKeywordsText', matchedKeywords.join(', ') || this._get_from_i18n('none'));
			model.setProperty('/missingKeywordsText', missingKeywords.join(', ') || this._get_from_i18n('none'));
			model.setProperty('/hasResult', true);
		},

		_updateDefaultButton: function () {
			const model = this.getView().getModel('view');
			const isDefault = model.getProperty('/resumeText') === defaultResume[model.getProperty('/language')];

			model.setProperty('/defaultButtonType', isDefault ? 'Default' : 'Emphasized');
		},

		_get_from_i18n: function (key) { return this.resourceBundle.getText(key); },
		
	});
}
);
