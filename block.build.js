/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    Editable = _wp$blocks.Editable,
    MediaUploadButton = _wp$blocks.MediaUploadButton,
    InspectorControls = _wp$blocks.InspectorControls,
    BlockDescription = _wp$blocks.BlockDescription,
    _wp$blocks$source = _wp$blocks.source,
    attr = _wp$blocks$source.attr,
    children = _wp$blocks$source.children;


registerBlockType('gutenberg-jpagano-blocks/media-object', {
	title: __('Media Object'),
	icon: 'list-view',
	category: 'formatting',
	attributes: {
		title: {
			type: 'array',
			source: children('h2')
		},
		mediaID: {
			type: 'number'
		},
		mediaURL: {
			type: 'string',
			source: attr('img', 'src')
		},
		content: {
			type: 'array',
			source: children('.media-object__content')
		}
	},
	edit: function edit(props) {
		var focusedEditable = props.focus ? props.focus.editable || 'title' : null;
		var attributes = props.attributes;

		var onChangeTitle = function onChangeTitle(value) {
			props.setAttributes({ title: value });
		};
		var onFocusTitle = function onFocusTitle(focus) {
			props.setFocus(_.extend({}, focus, { editable: 'title' }));
		};
		var onSelectImage = function onSelectImage(media) {
			props.setAttributes({
				mediaURL: media.url,
				mediaID: media.id
			});
		};
		var onChangeContent = function onChangeContent(value) {
			props.setAttributes({ content: value });
		};
		var onFocusContent = function onFocusContent(focus) {
			props.setFocus(_.extend({}, focus, { editable: 'content' }));
		};

		return [!!props.focus && wp.element.createElement(
			InspectorControls,
			{ key: 'inspector' },
			wp.element.createElement(
				BlockDescription,
				null,
				wp.element.createElement(
					'p',
					null,
					__('Media Object is a useful layout block for displaying an item, usually an image, alongside some content, usually text.')
				)
			)
		), wp.element.createElement(
			'div',
			{ className: props.className },
			wp.element.createElement(
				'div',
				{ className: 'media-object' },
				wp.element.createElement(
					'div',
					{ className: 'media-object__section' },
					wp.element.createElement(
						MediaUploadButton,
						{
							buttonProps: {
								className: attributes.mediaID ? 'image-button' : 'components-button button button-large'
							},
							onSelect: onSelectImage,
							type: 'image',
							value: attributes.mediaID
						},
						attributes.mediaID ? wp.element.createElement('img', { src: attributes.mediaURL, className: 'media-object__image', alt: attributes.alt }) : __('Upload Image')
					)
				),
				wp.element.createElement(
					'div',
					{ className: 'media-object__section' },
					wp.element.createElement(Editable, {
						tagName: 'h2',
						className: 'media-object__title',
						placeholder: __('Media Object title'),
						value: attributes.title,
						onChange: onChangeTitle,
						focus: focusedEditable === 'title',
						onFocus: onFocusTitle
					}),
					wp.element.createElement(Editable, {
						tagName: 'div',
						multiline: 'p',
						className: 'media-object__content',
						placeholder: __('Media Object content'),
						value: attributes.content,
						onChange: onChangeContent,
						focus: focusedEditable === 'content',
						onFocus: onFocusContent
					})
				)
			)
		)];
	},
	save: function save(props) {
		var className = props.className,
		    _props$attributes = props.attributes,
		    title = _props$attributes.title,
		    mediaURL = _props$attributes.mediaURL,
		    mediaAlt = _props$attributes.mediaAlt,
		    content = _props$attributes.content;


		return wp.element.createElement(
			'div',
			{ className: className },
			wp.element.createElement(
				'div',
				{ className: 'media-object' },
				wp.element.createElement(
					'div',
					{ className: 'media-object__section' },
					mediaURL && wp.element.createElement('img', { className: 'media-object__image', src: mediaURL, alt: mediaAlt })
				),
				wp.element.createElement(
					'div',
					{ className: 'media-object__section' },
					wp.element.createElement(
						'h2',
						{ className: 'media-object__title' },
						title
					),
					wp.element.createElement(
						'div',
						{ className: 'media-object__content' },
						content
					)
				)
			)
		);
	}
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDg1YTM0ZWI3ODc5NWNkNDA5ZjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jsb2NrLmpzIl0sIm5hbWVzIjpbIl9fIiwid3AiLCJpMThuIiwiYmxvY2tzIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJFZGl0YWJsZSIsIk1lZGlhVXBsb2FkQnV0dG9uIiwiSW5zcGVjdG9yQ29udHJvbHMiLCJCbG9ja0Rlc2NyaXB0aW9uIiwic291cmNlIiwiYXR0ciIsImNoaWxkcmVuIiwidGl0bGUiLCJpY29uIiwiY2F0ZWdvcnkiLCJhdHRyaWJ1dGVzIiwidHlwZSIsIm1lZGlhSUQiLCJtZWRpYVVSTCIsImNvbnRlbnQiLCJlZGl0IiwicHJvcHMiLCJmb2N1c2VkRWRpdGFibGUiLCJmb2N1cyIsImVkaXRhYmxlIiwib25DaGFuZ2VUaXRsZSIsInZhbHVlIiwic2V0QXR0cmlidXRlcyIsIm9uRm9jdXNUaXRsZSIsInNldEZvY3VzIiwiXyIsImV4dGVuZCIsIm9uU2VsZWN0SW1hZ2UiLCJtZWRpYSIsInVybCIsImlkIiwib25DaGFuZ2VDb250ZW50Iiwib25Gb2N1c0NvbnRlbnQiLCJjbGFzc05hbWUiLCJhbHQiLCJzYXZlIiwibWVkaWFBbHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7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QyxNQUREO0FBRUM7QUFBQTtBQUFBLFFBQUssV0FBVSx1QkFBZjtBQUNFTztBQURGO0FBRkQ7QUFSRDtBQURELEdBREQ7QUFtQkE7QUFsSTBELENBQTVELEUiLCJmaWxlIjoiYmxvY2suYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ODVhMzRlYjc4Nzk1Y2Q0MDlmNCIsImNvbnN0IHsgX18gfSA9IHdwLmkxOG47XG5jb25zdCB7XG5cdHJlZ2lzdGVyQmxvY2tUeXBlLFxuXHRFZGl0YWJsZSxcblx0TWVkaWFVcGxvYWRCdXR0b24sXG5cdEluc3BlY3RvckNvbnRyb2xzLFxuXHRCbG9ja0Rlc2NyaXB0aW9uLFxuXHRzb3VyY2U6IHtcblx0XHRhdHRyLFxuXHRcdGNoaWxkcmVuLFxuXHR9LFxufSA9IHdwLmJsb2NrcztcblxucmVnaXN0ZXJCbG9ja1R5cGUoICdndXRlbmJlcmctanBhZ2Fuby1ibG9ja3MvbWVkaWEtb2JqZWN0Jywge1xuXHR0aXRsZTogX18oICdNZWRpYSBPYmplY3QnICksXG5cdGljb246ICdsaXN0LXZpZXcnLFxuXHRjYXRlZ29yeTogJ2Zvcm1hdHRpbmcnLFxuXHRhdHRyaWJ1dGVzOiB7XG5cdFx0dGl0bGU6IHtcblx0XHRcdHR5cGU6ICdhcnJheScsXG5cdFx0XHRzb3VyY2U6IGNoaWxkcmVuKCAnaDInICksXG5cdFx0fSxcblx0XHRtZWRpYUlEOiB7XG5cdFx0XHR0eXBlOiAnbnVtYmVyJyxcblx0XHR9LFxuXHRcdG1lZGlhVVJMOiB7XG5cdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdHNvdXJjZTogYXR0ciggJ2ltZycsICdzcmMnICksXG5cdFx0fSxcblx0XHRjb250ZW50OiB7XG5cdFx0XHR0eXBlOiAnYXJyYXknLFxuXHRcdFx0c291cmNlOiBjaGlsZHJlbiggJy5tZWRpYS1vYmplY3RfX2NvbnRlbnQnICksXG5cdFx0fSxcblx0fSxcblx0ZWRpdDogKCBwcm9wcyApID0+IHtcblx0XHRjb25zdCBmb2N1c2VkRWRpdGFibGUgPSBwcm9wcy5mb2N1cyA/IHByb3BzLmZvY3VzLmVkaXRhYmxlIHx8ICd0aXRsZScgOiBudWxsO1xuXHRcdGNvbnN0IGF0dHJpYnV0ZXMgPSBwcm9wcy5hdHRyaWJ1dGVzO1xuXG5cdFx0Y29uc3Qgb25DaGFuZ2VUaXRsZSA9ICggdmFsdWUgKSA9PiB7XG5cdFx0XHRwcm9wcy5zZXRBdHRyaWJ1dGVzKCB7IHRpdGxlOiB2YWx1ZSB9ICk7XG5cdFx0fTtcblx0XHRjb25zdCBvbkZvY3VzVGl0bGUgPSAoIGZvY3VzICkgPT4ge1xuXHRcdFx0cHJvcHMuc2V0Rm9jdXMoIF8uZXh0ZW5kKCB7fSwgZm9jdXMsIHsgZWRpdGFibGU6ICd0aXRsZScgfSApICk7XG5cdFx0fTtcblx0XHRjb25zdCBvblNlbGVjdEltYWdlID0gKCBtZWRpYSApID0+IHtcblx0XHRcdHByb3BzLnNldEF0dHJpYnV0ZXMoIHtcblx0XHRcdFx0bWVkaWFVUkw6IG1lZGlhLnVybCxcblx0XHRcdFx0bWVkaWFJRDogbWVkaWEuaWQsXG5cdFx0XHR9ICk7XG5cdFx0fTtcblx0XHRjb25zdCBvbkNoYW5nZUNvbnRlbnQgPSAoIHZhbHVlICkgPT4ge1xuXHRcdFx0cHJvcHMuc2V0QXR0cmlidXRlcyggeyBjb250ZW50OiB2YWx1ZSB9ICk7XG5cdFx0fTtcblx0XHRjb25zdCBvbkZvY3VzQ29udGVudCA9ICggZm9jdXMgKSA9PiB7XG5cdFx0XHRwcm9wcy5zZXRGb2N1cyggXy5leHRlbmQoIHt9LCBmb2N1cywgeyBlZGl0YWJsZTogJ2NvbnRlbnQnIH0gKSApO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gW1xuXHRcdFx0ISEgcHJvcHMuZm9jdXMgJiYgKFxuXHRcdFx0XHQ8SW5zcGVjdG9yQ29udHJvbHMga2V5PVwiaW5zcGVjdG9yXCI+XG5cdFx0XHRcdFx0PEJsb2NrRGVzY3JpcHRpb24+XG5cdFx0XHRcdFx0XHQ8cD57IF9fKCAnTWVkaWEgT2JqZWN0IGlzIGEgdXNlZnVsIGxheW91dCBibG9jayBmb3IgZGlzcGxheWluZyBhbiBpdGVtLCB1c3VhbGx5IGFuIGltYWdlLCBhbG9uZ3NpZGUgc29tZSBjb250ZW50LCB1c3VhbGx5IHRleHQuJyApIH08L3A+XG5cdFx0XHRcdFx0PC9CbG9ja0Rlc2NyaXB0aW9uPlxuXHRcdFx0XHQ8L0luc3BlY3RvckNvbnRyb2xzPlxuXHRcdFx0KSxcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXsgcHJvcHMuY2xhc3NOYW1lIH0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtb2JqZWN0XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1vYmplY3RfX3NlY3Rpb25cIj5cblx0XHRcdFx0XHRcdDxNZWRpYVVwbG9hZEJ1dHRvblxuXHRcdFx0XHRcdFx0XHRidXR0b25Qcm9wcz17XG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiBhdHRyaWJ1dGVzLm1lZGlhSUQgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQnaW1hZ2UtYnV0dG9uJyA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCdjb21wb25lbnRzLWJ1dHRvbiBidXR0b24gYnV0dG9uLWxhcmdlJyxcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q9eyBvblNlbGVjdEltYWdlIH1cblx0XHRcdFx0XHRcdFx0dHlwZT1cImltYWdlXCJcblx0XHRcdFx0XHRcdFx0dmFsdWU9eyBhdHRyaWJ1dGVzLm1lZGlhSUQgfVxuXHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcy5tZWRpYUlEID9cblx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXsgYXR0cmlidXRlcy5tZWRpYVVSTCB9IGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdF9faW1hZ2VcIiBhbHQ9eyBhdHRyaWJ1dGVzLmFsdCB9IC8+IDpcblx0XHRcdFx0XHRcdFx0XHRcdF9fKCAnVXBsb2FkIEltYWdlJyApXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdDwvTWVkaWFVcGxvYWRCdXR0b24+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdF9fc2VjdGlvblwiPlxuXHRcdFx0XHRcdFx0PEVkaXRhYmxlXG5cdFx0XHRcdFx0XHRcdHRhZ05hbWU9XCJoMlwiXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdF9fdGl0bGVcIlxuXHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17IF9fKCAnTWVkaWEgT2JqZWN0IHRpdGxlJyApIH1cblx0XHRcdFx0XHRcdFx0dmFsdWU9eyBhdHRyaWJ1dGVzLnRpdGxlIH1cblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyBvbkNoYW5nZVRpdGxlIH1cblx0XHRcdFx0XHRcdFx0Zm9jdXM9eyBmb2N1c2VkRWRpdGFibGUgPT09ICd0aXRsZScgfVxuXHRcdFx0XHRcdFx0XHRvbkZvY3VzPXsgb25Gb2N1c1RpdGxlIH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8RWRpdGFibGVcblx0XHRcdFx0XHRcdFx0dGFnTmFtZT1cImRpdlwiXG5cdFx0XHRcdFx0XHRcdG11bHRpbGluZT1cInBcIlxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZWRpYS1vYmplY3RfX2NvbnRlbnRcIlxuXHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17IF9fKCAnTWVkaWEgT2JqZWN0IGNvbnRlbnQnICkgfVxuXHRcdFx0XHRcdFx0XHR2YWx1ZT17IGF0dHJpYnV0ZXMuY29udGVudCB9XG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsgb25DaGFuZ2VDb250ZW50IH1cblx0XHRcdFx0XHRcdFx0Zm9jdXM9eyBmb2N1c2VkRWRpdGFibGUgPT09ICdjb250ZW50JyB9XG5cdFx0XHRcdFx0XHRcdG9uRm9jdXM9eyBvbkZvY3VzQ29udGVudCB9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2Pixcblx0XHRdO1xuXHR9LFxuXHRzYXZlOiAoIHByb3BzICkgPT4ge1xuXHRcdGNvbnN0IHtcblx0XHRcdGNsYXNzTmFtZSxcblx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdG1lZGlhVVJMLFxuXHRcdFx0XHRtZWRpYUFsdCxcblx0XHRcdFx0Y29udGVudCxcblx0XHRcdH0sXG5cdFx0fSA9IHByb3BzO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXsgY2xhc3NOYW1lIH0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtb2JqZWN0XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1vYmplY3RfX3NlY3Rpb25cIj5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bWVkaWFVUkwgJiYgKFxuXHRcdFx0XHRcdFx0XHRcdDxpbWcgY2xhc3NOYW1lPVwibWVkaWEtb2JqZWN0X19pbWFnZVwiIHNyYz17IG1lZGlhVVJMIH0gYWx0PXsgbWVkaWFBbHQgfSAvPlxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1vYmplY3RfX3NlY3Rpb25cIj5cblx0XHRcdFx0XHRcdDxoMiBjbGFzc05hbWU9XCJtZWRpYS1vYmplY3RfX3RpdGxlXCI+e3RpdGxlfTwvaDI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdF9fY29udGVudFwiPlxuXHRcdFx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH0sXG59ICk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmxvY2suanMiXSwic291cmNlUm9vdCI6IiJ9