const { Command } = require('commander');
const chalk = require('chalk');
const {
    listContacts, 
    getContactById,
    removeContact,
    addContact
} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

(async ({ action, id, name, email, phone }) => {
    try {
        switch (action) {
            case 'list':
              const contacts = await listContacts();
              console.table(contacts);
              break;
        
            case 'get':
              const contactById = await getContactById(id);
              if(contactById) {
                console.log(chalk.green('Contact was found'));
                console.log(contactById);
              } else {
                console.log(chalk.yellow('Contact was not found'));
              }
              break;
        
            case 'add':
              const contact = await addContact(name, email, phone);
              console.log(chalk.green('Add new contact'));
              console.log(contact);
              break;
        
            case 'remove':
              const deletedContact = await removeContact(id);
              console.log(chalk.green('Contact deleted'));  
              console.log(deletedContact);
              break;
        
            default:
              console.warn(chalk.red('Unknown action type!'));
        }
    } catch (error) {
        console.error(chalk.red(error.message));
    }
})(argv)

// listContacts();
// addContact('Maria', 'maria@gmail.com', '8977653');
// getContactById(8);
// removeContact(5);
// getContactById(7);