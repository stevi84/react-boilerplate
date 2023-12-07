describe('React-Kurs application', () => {
  it('should load the todo dialog', async () => {
    await browser.url('http://localhost:3000/');
    await $('#loading-spinner').waitForDisplayed({ timeout: 10000, reverse: true });

    await browser.pause(1000);
  });

  it('should create a new todo', async () => {
    await $('#todo-table-button-create').click();
    await $('#todo-table-row-new-col-0').setValue('tomsmith');
    await $('#todo-table-row-new-col-1').setValue('20.01.2023');
    await $('#todo-table-row-new-col-2').setValue('Beschreibung');
    await $('#todo-table-row-new-button-save').click();

    await $('#notistack-snackbar').waitForDisplayed({ timeout: 10000 });
    await expect($('#notistack-snackbar')).toHaveText('Todo wurde neu erstellt.');
    await $('#notistack-snackbar').waitForDisplayed({ timeout: 10000, reverse: true });

    await expect($('#todo-table-row-3-col-0')).toHaveText('tomsmith');
    await expect($('#todo-table-row-3-col-1')).toHaveText('20.01.2023');
    await expect($('#todo-table-row-3-col-2')).toHaveText('Beschreibung');
    await expect($('#todo-table-row-3-col-3')).not.toBeSelected();

    await browser.pause(1000);
  });

  it('should edit the new todo', async () => {
    await $('#todo-table-row-3-button-edit').click();
    await $('#todo-table-row-3-col-3').click();
    await $('#todo-table-row-3-button-save').click();

    await $('#notistack-snackbar').waitForDisplayed({ timeout: 10000 });
    await expect($('#notistack-snackbar')).toHaveText('Todo wurde aktualisiert.');
    await $('#notistack-snackbar').waitForDisplayed({ timeout: 10000, reverse: true });

    await expect($('#todo-table-row-3-col-3')).toBeSelected();

    await browser.pause(1000);
  });

  it('should delete the new todo', async () => {
    await $('#todo-table-row-3-button-delete').click();
    await $('#modal-confirm-cancel').waitForDisplayed({ timeout: 10000 });
    await $('#modal-confirm-cancel-button-confirm').click();
    await $('#modal-confirm-cancel').waitForDisplayed({ timeout: 10000, reverse: true });

    await $('#notistack-snackbar').waitForDisplayed({ timeout: 10000 });
    await expect($('#notistack-snackbar')).toHaveText('Todo wurde gelöscht.');
    await $('#notistack-snackbar').waitForDisplayed({ timeout: 10000, reverse: true });

    await browser.pause(1000);
  });
});
