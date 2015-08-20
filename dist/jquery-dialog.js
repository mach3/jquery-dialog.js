/*!
 * jquery-dialog.js
 * ----------------
 * Tiny modal dialog library
 *
 * @version 0.1.0 (2015-0810-2104)
 * @author mach3 <http://github.com/mach3>
 * @license MIT
 * @url https://github.com/mach3/jquery-dialog.js
 */
(function($){

	$.typeName = function(obj){
		var m = Object.prototype.toString.call(obj).match(/^\[object\s(\w+)\]$/);
		return m ? m[1] : undefined;
	};

	/**
	 * Dialog Class
	 * ------------
	 * @class Controll dialog (modal window)
	 */
	var Dialog = function(){
		var my, style;
		my = this;
		style = document.createElement("i").style;
		this.legacy = ! ("transform" in style)
			&& ! ("-webkit-transform" in style)
			&& ! ("-ms-transform" in style);
		this.close = $.proxy(this.close, this);
		this.items = {};

		// events
		this.emitter = $(this);
		$.each(["on", "off", "trigger"], function(i, name){
			my[name] = function(){
				this.emitter[name].apply(this.emitter, arguments);
				return this;
			};
		});
	};

	$.extend(Dialog.prototype, {

		EVENT_CLOSE: "close",
		EVENT_OPEN: "open",

		emitter: null,
		legacy: null,
		container: null,
		current: null,
		items: null,

		options: {
			zIndex: 99,
			className: "dialog",
			containerClassName: "dialog-container",
			width: "60%",
			clone: false,
			duration: 300,
			backgroundColor: "rgba(0, 0, 0, .9)",
			top: "auto"
		},

		/**
		 * Initialize dialog container
		 */
		initContainer: function(){
			var o = this.options;
			if(! this.container){
				this.container = $("<div>", {
					"class": o.containerClassName
				})
				.css({
					display: "none",
					position: "fixed",
					backgroundColor: o.backgroundColor,
					width: "100%",
					height: "100%",
					left: 0,
					top: 0
				})
				.prependTo("body")
				.on("click", this.close)
				.on("click", "[data-dialog-close]", this.close)
				.on("click", "[data-dialog-item]", function(e){
					e.stopPropagation();
				});
			}
		},

		/**
		 * Configure options
		 * @param {Object} options
		 */
		config: function(options){
			this.options = $.extend({}, this.options, options);
		},

		/**
		 * Open a dialog
		 * @param {Object|HTML*Element|jQuery} data
		 * @param {Object} options (optional)
		 */
		open: function(data, options){
			var o, item, node, dialog, size;

			this.initContainer();
			o = this.options;
			item = {};

			// Generate item
			// - HTML*Element
			if(!! data.jquery || /HTML.*Element/.test($.typeName(data))){
				options = options || {};
				item = $.extend({
					name: null,
					clone: false,
					content: data,
					width: o.width,
					top: o.top
				}, options);
			}
			// - Already exists
			else if(data.dialog in this.items){
				item = this.items[data.dialog];
			// - New one
			} else {
				item = $.extend({
					width: o.width,
					clone: o.clone,
					top: o.top
				}, {
					name: data.dialog,
					width: data.dialogWidth,
					top: data.dialogTop,
					clone: (data.dialogClone === "") ? true : data.dialogClone
				});

				node = $(item.name);
				item.parent = node.parent();
				item.content = node;
				this.items[data.dialog] = item;
			}

			// Generate dialog
			dialog =  $("<div>", {
				"class": o.className,
				"data-dialog-item": "true"
			})
			.css({
				"position": "relative",
				"width": item.width,
				"top": item.top === "auto" ? "50%" : item.top,
				"margin": "auto"
			})
			.append(item.clone ? item.content.clone() : item.content);

			// Top position
			if(item.top === "auto"){
				if(this.legacy){
					// Get content size 
					dialog.css({
						"position": "absolute",
						"visibility": "hidden"
					})
					.prependTo("body");
					size = {
						width: dialog.outerWidth(),
						height: dialog.outerHeight()
					};
					dialog.css({
						"visibility": "visible",
						"left": "50%",
						"margin-top": -1 * size.height / 2,
						"margin-left": -1 * size.width / 2
					});
				} else {
					dialog.css("transform", "translateY(-50%)")
				}
			}

			this.container.append(dialog).fadeIn(o.duration);
			this.current = item.name;
			this.trigger(this.EVENT_OPEN);
		},

		/**
		 * Close dialog
		 */
		close: function(){
			var o, my, item;
			o = this.options;
			item = this.items[this.current];
			my = this;
			this.container.fadeOut(o.duration, function(){
				if(!! item && ! item.clone){
					item.content.appendTo(item.parent);
				}
				my.container.children().remove();
			});
			this.current = null;
			this.trigger(this.EVENT_CLOSE);
		}

	});

	$.dialog = new Dialog();

	$.fn.dialog = function(options){
		$.dialog.open(this, options);
	};

	$(document).on("click", "[data-dialog]", function(e){
		e.preventDefault();
		$.dialog.open($(this).data());
	});

}(jQuery));