# Brand module

Client handoff: https://pax-longevity-flow.lovable.app/  
Docs: `docs/client-brand-kit.md`

```
kit.css       CSS tokens (5 colors, Instrument Serif, semantic aliases)
passport.js   Product identity + BRAND_KIT contract
marks.js      SVG mark + icon path map
BrandLogo     Marketing lockup
BrandMark     Portal / start lockup
BrandIcon     Sun / leaf / monogram
index.js      Public barrel (visual brand only)
connect.js    Data adapter — keep imports explicit from ./connect.js
```

Import visual brand from the barrel:

```js
import { BrandLogo, BrandMark, BrandIcon, PAX_PASSPORT, BRAND_KIT } from '../brand/index.js';
```

Data:

```js
import { login, signup } from '../brand/connect.js';
```
