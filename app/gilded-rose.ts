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
    "Aged Brie": (item: Item) => {},
    // "Backstage passes" increases in quality as the concert approaches
    // but drops to zero after the concert
    "Backstage passes to a TAFKAL80ETC concert": (item: Item) => {},

    // "Conjured" items degrade in quality twice as fast as normal items
    "Conjured": (item: Item) => {},

    // "Sulfuras" is a legendary item and doesn't change in quality or sellIn
    "Sulfuras, Hand of Ragnaros": (item: Item) => {
      // No changes for Sulfuras
    },

    // Default rule for normal items
    "default": (item: Item) => {},
  };

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
