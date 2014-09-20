parelation.js
=============

ActiveRecord–like API to access backends built with [parelation gem](https://github.com/meskyanichi/parelation).

## Requirements

The only dependency for this library is jQuery. Your backend should obviously be built with parelation gem.

## Usage

First, require parelation.js and jQuery in your HTML page:

```html
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="../dist/parelation.min.js"></script>
```

Then, define your models:

```coffee
Ticket = Parelation.at("/tickets")
Cinema = Parelation.at("/cinemas")
```

Now, you can use them as you would with ActiveRecord (but in an asynchronous fashion):

```coffee
Ticket.where(name: "The Lord Of The Rings")
      .order(updated_at: "desc")
      .select("cost")
      .fetch()
      .done (tickets) -> console.log(tickets)
```

parelation.js will build your query lazily, executing it only when needed. When you call `fetch()` on a query, in fact, an AJAX GET is issued to the model location and a jQuery Deferred is returned.

```coffee
Ticket.fetch().done (tickets) -> console.log tickets
              .fail (error) -> console.warn error
```

Under the hood parelation.js just calls jQuery `$.get(...)`, converting your javascript query into a parelation compatible request.

## Supported Query Criterias

* `where`, `where_gt`, `where_gte`, `where_lt`, `where_lte`
* `order`
* `limit`
* `offset`
* `select`

`fetch` is not a query criteria, see the above section for further details.

## License

This software is provided 'as-is', without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
