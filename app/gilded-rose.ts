export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  /**
   * Adjusts the quality of a given item by a specified amount, ensuring the quality remains within valid bounds. max quality is 50 and min quality is 0.
   * @param item - The item whose quality needs to be adjusted.
   * @param amount - The amount by which the item's quality should be adjusted. Can be positive or negative.
   */
  adjustQuality(item: Item, amount: number): void {
    item.quality = Math.min(50, Math.max(0, item.quality + amount));
  }

  // Define the update rules for each item type
  updateRules = {
    // "Aged Brie" increases in quality over time
    "Aged Brie": (item: Item) => {
      const qualityAmount = item.sellIn <= 0 ? 2 : 1;
      this.adjustQuality(item, qualityAmount);
      item.sellIn--;
    },
    // "Backstage passes" increases in quality as the concert approaches
    // but drops to zero after the concert
    "Backstage passes to a TAFKAL80ETC concert": (item: Item) => {
      let qualityAmount = 0;
      if (item.sellIn <= 0) {
        qualityAmount = 0;
      } else if (item.sellIn <= 5) {
        qualityAmount = 3;
      } else if (item.sellIn <= 10) {
        qualityAmount = 2;
      } else {
        qualityAmount = 1;
      }
      this.adjustQuality(item, qualityAmount);
      item.sellIn--;
    },

    // "Conjured" items degrade in quality twice as fast as normal items
    Conjured: (item: Item) => {
      const qualityAmount = item.sellIn <= 0 ? -4 : -2;
      this.adjustQuality(item, qualityAmount);
      item.sellIn--;
    },

    // "Sulfuras" is a legendary item and doesn't change in quality or sellIn
    "Sulfuras, Hand of Ragnaros": (item: Item) => {
      // No changes for Sulfuras
    },

    // Default rule for normal items
    default: (item: Item) => {
      const qualityAmount = item.sellIn <= 0 ? -2 : -1;
      this.adjustQuality(item, qualityAmount);
      item.sellIn--;
    },
  };

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const rule = this.updateRules[item.name] || this.updateRules["default"];
      rule(item);
    }
    return this.items;
  }
}
