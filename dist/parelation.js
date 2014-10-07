(function() {
  var AllScope, LimitScope, OffsetScope, OrderScope, Scope, SelectScope, WhereScope, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Scope = (function() {
    function Scope() {}

    Scope.prototype.select = function(columns) {
      return new SelectScope(this, columns);
    };

    Scope.prototype.where = function(options) {
      return new WhereScope(this, options);
    };

    Scope.prototype.where_gt = function(options) {
      return new WhereScope(this, options, "gt");
    };

    Scope.prototype.where_lt = function(options) {
      return new WhereScope(this, options, "lt");
    };

    Scope.prototype.where_gte = function(options) {
      return new WhereScope(this, options, "gte");
    };

    Scope.prototype.where_lte = function(options) {
      return new WhereScope(this, options, "lte");
    };

    Scope.prototype.limit = function(number) {
      return new LimitScope(this, number);
    };

    Scope.prototype.offset = function(number) {
      return new OffsetScope(this, number);
    };

    Scope.prototype.order = function(options) {
      return new OrderScope(this, options);
    };

    return Scope;

  })();

  AllScope = (function(_super) {
    __extends(AllScope, _super);

    function AllScope(url) {
      this.url = url;
    }

    AllScope.prototype.fetch = function(data) {
      return $.get(this.url, data);
    };

    return AllScope;

  })(Scope);

  SelectScope = (function(_super) {
    __extends(SelectScope, _super);

    function SelectScope(scope, columns) {
      this.scope = scope;
      this.columns = columns;
    }

    SelectScope.prototype.fetch = function(data) {
      return this.scope.fetch($.extend(data, {
        "select[]": this.columns
      }));
    };

    return SelectScope;

  })(Scope);

  LimitScope = (function(_super) {
    __extends(LimitScope, _super);

    function LimitScope(scope, number) {
      this.scope = scope;
      this.number = number;
    }

    LimitScope.prototype.fetch = function(data) {
      return this.scope.fetch($.extend(data, {
        limit: this.number
      }));
    };

    return LimitScope;

  })(Scope);

  OffsetScope = (function(_super) {
    __extends(OffsetScope, _super);

    function OffsetScope(scope, number) {
      this.scope = scope;
      this.number = number;
    }

    OffsetScope.prototype.fetch = function(data) {
      return this.scope.fetch($.extend(data, {
        offset: this.number
      }));
    };

    return OffsetScope;

  })(Scope);

  OrderScope = (function(_super) {
    __extends(OrderScope, _super);

    function OrderScope(scope, options) {
      this.scope = scope;
      this.options = options;
    }

    OrderScope.prototype.fetch = function(data) {
      var criterias;
      criterias = $.map(Object.keys(this.options), (function(_this) {
        return function(key) {
          return "" + key + ":" + _this.options[key];
        };
      })(this));
      return this.scope.fetch($.extend(data, {
        "order[]": criterias
      }));
    };

    return OrderScope;

  })(Scope);

  WhereScope = (function(_super) {
    __extends(WhereScope, _super);

    function WhereScope(scope, options, direction) {
      this.scope = scope;
      this.options = options;
      this.where = direction ? "where_" + direction : "where";
    }

    WhereScope.prototype.fetch = function(data) {
      var key, where_options, _i, _len, _ref;
      where_options = {};
      _ref = Object.keys(this.options);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        where_options["" + this.where + "[" + key + "]"] = this.options[key];
      }
      return this.scope.fetch($.extend(data, where_options));
    };

    return WhereScope;

  })(Scope);

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Parelation = {
    at: function(url) {
      return new AllScope(url);
    }
  };

}).call(this);
