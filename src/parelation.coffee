class Scope
  select: (columns) ->
    new SelectScope(this, columns)

  where: (options) ->
    new WhereScope(this, options)

  where_gt: (options) ->
    new WhereScope(this, options, "gt")

  where_lt: (options) ->
    new WhereScope(this, options, "lt")

  where_gte: (options) ->
    new WhereScope(this, options, "gte")

  where_lte: (options) ->
    new WhereScope(this, options, "lte")

  limit: (number) ->
    new LimitScope(this, number)

  offset: (number) ->
    new OffsetScope(this, number)

  order: (options) ->
    new OrderScope(this, options)

class AllScope extends Scope
  constructor: (@url) ->

  fetch: (data) ->
    $.get(@url, data)

class SelectScope extends Scope
  constructor: (@scope, @columns) ->

  fetch: (data) ->
    @scope.fetch $.extend(data, "select[]": @columns)

class LimitScope extends Scope
  constructor: (@scope, @number) ->

  fetch: (data) ->
    @scope.fetch $.extend(data, limit: @number)

class OffsetScope extends Scope
  constructor: (@scope, @number) ->

  fetch: (data) ->
    @scope.fetch $.extend(data, offset: @number)

class OrderScope extends Scope
  constructor: (@scope, @options) ->

  fetch: (data) ->
    criterias = $.map Object.keys(@options), (key) =>
      "#{key}:#{@options[key]}"

    @scope.fetch $.extend(data, "order[]": criterias)

class WhereScope extends Scope
  constructor: (@scope, @options, direction) ->
    @where = if direction then "where_#{direction}" else "where"

  fetch: (data) ->
    where_options = { }
    for key in Object.keys(@options)
      where_options["#{@where}[#{key}]"] = @options[key]

    @scope.fetch $.extend(data, where_options)

root = exports ? this
root.Parelation = {
  at: (url) ->
    new AllScope(url)
}
