/**
 * 
 */
function Layout(config, ideo) {
    /**
     * @private
     * @member {Object}
     */
    this._config = config;
    /**
     * @private
     * @member {Ideogram}
     */
    this._ideo = ideo;
    /**
     * @private
     * @member {PloidyDescription}
     */
    this._description = new PloidyDescription(config.ploidyDesc);
    /**
     * Chromosome set's offset array.
     * @private
     * @member {Number[]}
     */
    this._translate = undefined;
    /**
     * Chromosome band's size.
     * @private
     * @member {Number}
     */
    this._tickSize = 8;
    /**
     * Chromosome rotation state.
     * @private
     * @member {Boolean}
     */
    this._isRotated = false;
};


/**
 * Factory method.
 * @public
 * @static
 * @param {Object} config
 * @param {Ideogram} ideo
 * @return {Layout}
 */
Layout.getInstance = function(config, ideo) {

    if ("perspective" in config && config.perspective == "comparative") {
        return new PairedLayout(config, ideo);
    } else if ("rows" in config && config.rows > 1) {
        return new SmallLayout(config, ideo);
    } else if (config.orientation === 'vertical') {
        return new VerticalLayout(config, ideo);
    } else {
        return new HorizontalLayout(config, ideo);
    }
};


/**
 * Rotate chromosome to original position.
 * @public
 * @param {Integer} chrSetNumber
 * @param {Integer} chrNumber
 * @param {SVGElement} chrElement
 * @param {Function} callback
 */
Layout.prototype.rotateBack = function(chrSetNumber, chrNumber, chrElement, callback) {

    throw new Error(this._class + '#rotateBack not implemented');
};


/**
 * Rotate chromosome to opposite position.
 * @public
 * @param {Integer} chrSetNumber
 * @param {Integer} chrNumber
 * @param {SVGElement} chrElement
 * @param {Function} callback
 */
Layout.prototype.rotateForward = function(chrSetNumber, chrNumber, chrElement, callback) {

    throw new Error(this._class + '#rotateForward not implemented');
};


/**
 * @public
 * @param {SVGElement} chrElement
 */
Layout.prototype.rotate = function(chrSetNumber, chrNumber, chrElement) {
    /*
     * Find chromosomes which should be hidden.
     */
    var otherChrs = d3.selectAll("g.chromosome").filter(function(d, i) {
        return this !== chrElement;
    });

    if (this._isRotated) {
        /*
         * Reset _isRotated flag.
         */
        this._isRotated = false;
        /*
         * Rotate chromosome back.
         */
        this.rotateBack(chrSetNumber, chrNumber, chrElement, function() {
            /*
             * Show all other chromosomes and chromosome labels.
             */
            otherChrs.style("display", null);
            d3.selectAll(".chrSetLabel, .chrLabel").style("display", null);
        });
    } else {
        /*
         * Set _isRotated flag.
         */
        this._isRotated = true;
        /*
         * Hide all other chromosomes and chromosome labels.
         */
        otherChrs.style("display", "none");
        d3.selectAll(".chrSetLabel, .chrLabel").style("display", "none");
        /*
         * Rotate chromosome.
         */
        this.rotateForward(chrSetNumber, chrNumber, chrElement);
    }
};


Layout.prototype._getAdditionalOffset = function() {

    return (this._config.annotationHeight || 0) * (this._config.numAnnotTracks || 1);
};


Layout.prototype._getChromosomeSetSize = function(chrSetNumber) {
    /*
     * Get last chromosome set size.
     */
    var setSize = this._description.getSetSize(chrSetNumber);
    /*
     * Increase offset by last chromosome set size.
     */
    return setSize * this._config.chrWidth * 2 + (this._config.ploidy > 1 ? 20 : 0);
};


/**
 * Get layout margin.
 * @public
 * @returns {Object}
 */
Layout.prototype.getMargin = function() {

    return this._margin;
};


/**
 * Get SVG element height.
 * @public
 * @param {Integer} taxId
 * @return {Number}
 */
Layout.prototype.getHeight = function(taxId) {

    throw new Error(this._class + '#getHeight not implemented');
};


Layout.prototype.getChromosomeBandTickY1 = function(chrNumber) {

    throw new Error(this._class + '#getChromosomeBandTickY1 not implemented');
};


Layout.prototype.getChromosomeBandTickY2 = function(chrNumber) {

    throw new Error(this._class + '#getChromosomeBandTickY2 not implemented');
};


/**
 * Get chromosome's band translate attribute.
 * @public
 * @param {Object} band
 * @param {Integer} chrNumber
 * @return {Object}
 */
Layout.prototype.getChromosomeBandLabelTranslate = function(band, chrNumber) {

    throw new Error(this._class + '#getChromosomeBandLabelTranslate not implemented');
};


/**
 * Get chromosome's band label text-anchor value.
 * @public
 * @param {Integer} chrNumber
 * @return {String|null}
 */
Layout.prototype.getChromosomeBandLabelAnchor = function(chrNumber) {

    throw new Error(this._class + '#getChromosomeBandLabelAnchor not implemented');
};


Layout.prototype.getChromosomeLabelXPosition = function(i) {

    throw new Error(this._class + '#getChromosomeLabelXPosition not implemented');
}


Layout.prototype.getChromosomeLabelYPosition = function(i) {

    throw new Error(this._class + '#getChromosomeLabelYPosition not implemented');
};


Layout.prototype.getChromosomeSetLabelYPosition = function(i) {

    throw new Error(this._class + '#getChromosomeSetLabelYPosition not implemented');
};


Layout.prototype.getChromosomeSetLabelXPosition = function(i) {

    throw new Error(this._class + '#getChromosomeSetLabelXPosition not implemented');
};


Layout.prototype.getChromosomeSetLabelTranslate = function() {

    throw new Error(this._class + '#getChromosomeSetLabelTranslate not implemented');
};


/**
 * Get chromosome set translate attribute.
 * @public
 * @param {Integer} setNumber - chromosome set number
 * @return {String}
 */
Layout.prototype.getChromosomeSetTranslate = function(setNumber) {

    throw new Error(this._class + '#getChromosomeSetTranslate not implemented');
}


/**
 * Get chromosome set translate's y offset.
 * @public
 * @param {Integer} setNumber - chromosome set number
 * @return {Number}
 */
Layout.prototype.getChromosomeSetYTranslate = function(setNumber) {

    throw new Error(this._class + '#getChromosomeSetYTranslate not implemented');
}