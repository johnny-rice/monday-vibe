import { test, Page, Locator } from "@playwright/test";

/**
 * Class representing a base element for Playwright tests.
 */
export class BaseElement {
  page: Page;
  locator: Locator;
  elementReportName: string;

  /**
   * Create a BaseElement.
   * @param {Page} page - The Playwright page object.
   * @param {Locator} locator - The locator for the element.
   * @param {string} elementReportName - The name for reporting purposes.
   */
  constructor(page: Page, locator: Locator, elementReportName: string) {
    this.page = page;
    this.locator = locator;
    this.elementReportName = elementReportName;
  }

  /**
   * Get the locator of the element.
   * @returns {Locator} - The locator of the element.
   */
  getLocator(): Locator {
    return this.locator;
  }

  /**
   * Check if the element is enabled.
   * @returns {Promise<boolean>} - Returns true if the element is enabled, otherwise false.
   */
  async isEnabled(): Promise<boolean> {
    let isEnabled = false;
    await test.step(`Return if ${this.elementReportName} is enabled`, async () => {
      isEnabled = await this.locator.isEnabled();
      return isEnabled;
    });
    return isEnabled;
  }

  /**
   * Hover the element.
   * @returns {Promise<void>}
   */
  async hover(): Promise<void> {
    await test.step(`Hover ${this.elementReportName}`, async () => {
      await this.locator.hover();
    });
  }

  /**
   * Click the element.
   * @returns {Promise<void>}
   */
  async click(): Promise<void> {
    await test.step(`Click ${this.elementReportName}`, async () => {
      await this.locator.click();
    });
  }

  /**
   * Scroll the element into view if needed.
   * @returns {Promise<void>}
   */
  async scrollIntoView(): Promise<void> {
    await test.step(`Scroll ${this.elementReportName} into view`, async () => {
      await this.locator.scrollIntoViewIfNeeded();
    });
  }

  /**
   * Get the value of an attribute of the element.
   * @param {string} attributeName - The name of the attribute.
   * @param {number} timeout - The timeout in milliseconds.
   * @returns {Promise<string | null>} - The value of the attribute.
   */
  async getAttributeValue(attributeName: string, timeout = 30000): Promise<string | null> {
    let attributeValue = null;

    await test.step(`Get attribute ${attributeName} of ${this.elementReportName}`, async () => {
      attributeValue = await this.locator.getAttribute(attributeName, { timeout });
    });

    return attributeValue;
  }

  /**
   * Get the text of the element.
   * @returns {Promise<string | undefined>} - The text of the element.
   */
  async getText(): Promise<string | undefined> {
    return await test.step(`Get text of ${this.elementReportName}`, async () => {
      const texts = [
        await this.locator.innerText(),
        await this.locator.textContent(),
        await this.getAttributeValue("value")
      ];
      const result = texts.find(text => text !== null && text !== undefined && text !== "");
      return result === null ? undefined : result;
    });
  }

  async waitFor(options = {}): Promise<void> {
    await test.step(`Wait for ${this.elementReportName}`, async () => {
      await this.locator.waitFor(options);
    });
  }

  async waitForVisible(): Promise<void> {
    await test.step(`Wait for ${this.elementReportName}`, async () => {
      await this.locator.waitFor({ state: "visible" });
    });
  }

  async waitForAbsence(): Promise<void> {
    await test.step(`Wait for ${this.elementReportName} to be absent`, async () => {
      await this.waitFor({ state: "detached" });
    });
  }

  async count(): Promise<number> {
    let count = 0;
    await test.step(`Count elements matching ${this.elementReportName}`, async () => {
      count = await this.locator.count();
    });
    return count;
  }

  async isVisible(): Promise<boolean> {
    let isVisible = false;
    await test.step(`Check if ${this.elementReportName} is visible`, async () => {
      isVisible = await this.locator.isVisible();
    });
    return isVisible;
  }

  /**
   * Wait for the list elements to stabilize (i.e., the count of items remains constant for a specified duration).
   * @param {Locator} locator - The locator for the elements.
   * @returns {Promise<void>}
   */
  protected async waitForAndVerifyElements(locator: Locator): Promise<void> {
    await test.step(`Wait for ${this.elementReportName} items to stabilize and verify existence`, async () => {
      let previousCount = 0;
      let stableCountTime = 0;
      const stabilizationTimeMs = 500;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const currentCount = await locator.count();

        // Verify we have at least one element
        if (currentCount === 0) {
          await this.page.waitForTimeout(100);
          continue;
        }

        // Check if all elements are visible
        const elements = await locator.all();
        const visibleStates = await Promise.all(elements.map(el => el.isVisible()));
        const allVisible = visibleStates.every(state => state === true);

        if (!allVisible) {
          await this.page.waitForTimeout(100);
          continue;
        }

        if (currentCount === previousCount) {
          stableCountTime += 100;
        } else {
          stableCountTime = 0;
        }

        if (stableCountTime >= stabilizationTimeMs) {
          break;
        }

        previousCount = currentCount;
        await this.page.waitForTimeout(100);
      }

      if ((await locator.count()) === 0) {
        throw new Error(`No ${this.elementReportName} elements found after stabilization`);
      }
    });
  }

  /**
   * Remove focus from the element.
   * @returns {Promise<void>}
   */
  async removeFocus(): Promise<void> {
    await test.step(`Remove focus from ${this.elementReportName}`, async () => {
      await this.page.locator("body").click();
    });
  }
}
