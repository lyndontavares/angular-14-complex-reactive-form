export function findInvalidControls() {
    const invalid = [];
    const controls = this.AddCustomerForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}
